-- =========================================================
-- 1. Tipos y función auxiliar
-- Tipos enumerados: Postgres rechaza cualquier valor fuera de la lista.
-- Es más seguro que un texto libre: 'aprobado', 'Approved', 'aprovado'.
-- =========================================================
create type public.user_role as enum ('artist', 'admin');
create type public.profile_status as enum ('pending', 'approved', 'suspended');
create type public.artwork_status as enum ('uploading', 'pending', 'approved', 'rejected', 'hidden');

-- Mantiene updated_at al día en cada UPDATE, sin depender de que el código lo recuerde.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- =========================================================
-- 2. profiles
-- =========================================================
create table public.profiles (
    -- Mismo id que el usuario de supabase Auth. Si se borra el usuario, se borra el perfil.
    id uuid primary key references auth.users (id) on delete cascade,
    role public.user_role not null default 'artist',
    status public.profile_status not null default 'pending',
    display_name text not null check (char_length(display_name) between 2 and 60),
    full_name text not null check (char_length(full_name) between 3 and 120),
    -- Formato internacional E.164: +573001234567
    phone_e164 text not null check (phone_e164 ~ '^\+[1-9][0-9]{7,14}$'),
    city text check (char_length(city) <= 80),
    bio text check (char_length(bio) <= 1000),
    avatar_key text,
    whatsapp_public boolean not null default false,
    -- Ley 1581: guardamos CUÁNDO autorizó el tratamiento de datos. Sin eso no hay perfil.
    data_consent_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================================
-- 3. categories
-- =========================================================
create table public.categories (
    -- smallint: nunca habrá más de 32.767 categorías. "generated always" = Postgres asigna el id.
    id smallint generated always as identity primary key,
    -- slug para la URL: solo minúsculas, números y guiones simples (tizas-pastel)
    slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    name text not null check (char_length(name) between 2 and 60),
    description text not null default '',
    how_to text not null default '',
    materials text not null default '',
    cover_key text,
    sort_order smallint not null default 0,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================================
-- 4. artworks
-- =========================================================
create table public.artworks (
    --uuid y no un número: así nadie adivina /obras/1, /obras/2... para recorrer la base.
    id uuid primary key default gen_random_uuid(),
    artist_id uuid not null references public.profiles (id) on delete cascade,
    -- restrict: no se puede borrar una categoría que todavía tiene obras.
    category_id smallint not null references public.categories (id) on delete restrict,
    title text not null check (char_length(title) between 1 and 120),
    description text check (char_length(description) <= 2000),
    year smallint check (year between 1000 and 2100),
    dimensions text check (char_length(dimensions) <= 60),
    image_key text,
    width integer check (width > 0),
    height integer check (height > 0),
    dominant_color text check (dominant_color ~ '^#[0-9a-fA-F]{6}$'),
    status public.artwork_status not null default 'uploading',
    reject_reason text check (char_length(reject_reason) <= 500),
    approved_by uuid references public.profiles (id) on delete set null,
    approved_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    -- Reglas de negocio que involucran varias columnas:
    -- salvo mientras se sube, toda obra debe tener imagen
    constraint artworks_has_image check (status = 'uploading' or image_key is not null),
    -- no se puede rechazar sin explicar por qué
    constraint artworks_reject_reason check (status <> 'rejected' or reject_reason is not null)
);

-- Índices parciales: solo indexan las filas que cumplen el WHERE.
-- Más pequeños y rápidos que indexar toda la tabla.
create index artworks_public_idx  on public.artworks (category_id, approved_at desc) where status = 'approved'; -- galería pública
create index artworks_pending_idx on public.artworks (created_at)                   where status = 'pending';  -- cola del admin
create index artworks_artist_idx  on public.artworks (artist_id, created_at desc);                             -- panel del artista

-- =========================================================
-- 5. Seguridad por defecto (RLS) y triggers
-- =========================================================
-- RLS activo SIN reglas = acceso denegado para anon y authenticated.
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.artworks enable row level security;

create trigger profiles_set_updated_at
    before update on public.profiles
    for each row execute function public.set_updated_at();
create trigger categories_set_updated_at
    before update on public.categories
    for each row execute function public.set_updated_at();
create trigger artworks_set_updated_at
    before update on public.artworks
    for each row execute function public.set_updated_at();