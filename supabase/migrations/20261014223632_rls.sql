-- =========================================================
-- 1. Funciones auxiliares (security definer: leen profiles sin pasar por RLS)
-- =========================================================
create or replace function public.is_admin()
returns boolean
language sql
stable -- mismo resultado durante toda la consulta (Postgres puede reutilizarlo)
security definer
set search_path = ''
as $$
select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin' and status = 'approved'
);
$$;

create or replace function public.is_approved_artist()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and status = 'approved'
);
$$;

-- =========================================================
-- 2. Reglas: categories
-- =========================================================
-- Cualquiera ve las activas; el admin ve también las desactivadas.
create policy "categories: read actives"
on public.categories for select
to anon, authenticated
using (active or (select public.is_admin()));

create policy "categories: admin created"
on public.categories for insert
to authenticated
with check ((select public.is_admin()));

create policy "categories: admin updated"
on public.categories for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "categories: admin deleted"
on public.categories for delete
to authenticated
using ((select public.is_admin()));

-- =========================================================
-- 3. Reglas: profiles
-- (sin regla de insert: el perfil lo crea un trigger al registrarse, en la fase 1;
--  sin regla de delete: borrar la cuenta lo hace la API, en la fase 3)
-- =========================================================
create policy "profiles: read own or admin"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id or (select public.is_admin()));

create policy "profiles: update own or admin"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id or (select public.is_admin()))
with check ((select auth.uid()) = id or (select public.is_admin()));

-- =========================================================
-- 4. Reglas: artworks (lectura pública: funciones de la fase 2)
-- =========================================================
create policy "artworks: read owns or admin"
on public.artworks for select 
to authenticated
using (artist_id = (select auth.uid()) or (select public.is_admin()));

-- Solo un artista APROBADO crea obras, y solo a su nombre.
create policy "artworks: create own if approved"
on public.artworks for insert
to authenticated
with check (artist_id = (select auth.uid()) and (select public.is_approved_artist()));

create policy "artworks: update own or admin"
on public.artworks for update
to authenticated
using (artist_id = (select auth.uid()) or (select public.is_admin()))
with check (artist_id = (select auth.uid()) or (select public.is_admin()));

create policy "artworks: delete own or admin"
on public.artworks for delete
to authenticated
using (artist_id = (select auth.uid()) or (select public.is_admin()));

-- =========================================================
-- 5. Triggers de protección (reglas por columna)
-- Si auth.uid() es null, la petición no viene de un usuario de la app
-- (SQL Editor, migraciones, service_role de la API): no se restringe.
-- =========================================================

-- profiles: nadie se cmabia a si mismo el rol ni el estado.
create or replace function public.profiles_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    if (select auth.uid()) is not null and not public.is_admin() then
        if new.role is distinct from old.role or new.status is distinct from old.status then
            raise exception 'No tienes permiso para cambiar el rol o el estado del perfil'
                using errcode = '42501'; -- código estandar de permiso insuficiente
        end if;
    end if;
    return new;
end;
$$;

create trigger profiles_guard
    before update on public.profiles
    for each row execute function public.profiles_guard();

-- artworks: el flujo de moderación solo lo controla el admin
create or replace function public.artworks_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    -- Admin o procesos internos: sin restricciones.
    if (select auth.uid()) is null or public.is_admin() then
        return new;
    end if;

    -- INSERT del artista: toda obra nace en 'uploading', sin importar lo que envíe.
    if tg_op = 'INSERT' then
        new.status := 'uploading';
        new.approved_by := null;
        new.approved_at := null;
        new.reject_reason := null;
        return new;
    end if;

    -- UPDATE del artista:
    if new.artist_id is distinct from old.artist_id then
        raise exception 'No puedes transferir una obra a otro artista' using errcode = '42501';
    end if;

    if new.approved_by is distinct from old.approved_by
    or new.approved_at is distinct from old.approved_at
    or new.reject_reason is distinct from old.reject_reason then
        raise exception 'Los campos de moderación son exclusivos del admin' using errcode = '42501';
    end if;

    -- Única transición de estado permitida al artista: confirmar la subida.
    if new.status is distinct from old.status
        and not (old.status = 'uploading' and new.status = 'pending') then
        raise exception 'No puedes cambiar el estado de la obra' using errcode = '42501';
    end if;

    -- Si modifica una obra ya revisada, vuelve a moderación
    -- (evita aprobar algo y luego cambiarlo por contenido inapropiado).
    if old.status in ('approved', 'rejected')
        and (new.title, new.description, new.category_id, new.image_key)
            is distinct from (old.title, old.description, old.category_id, old.image_key) then
        new.status := 'pending';
        new.approved_by := null;
        new.approved_at := null;
        new.reject_reason := null;
    end if;

    return new;
end;
$$;

create trigger artworks_guard
    before insert or update on public.artworks
    for each row execute function public.artworks_guard();