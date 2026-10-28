-- =========================================================
-- Catálogo público: lo ÚNICO que un visitante puede leer de artistas y obras.
-- Las vistas corren con permisos de su dueño (security definer): exponen
-- solo las columnas y filas elegidas aquí, aunque anon no pueda leer las tablas.
-- =========================================================

create view public.public_artists
with (security_barrier = true)
as
select
    p.id,
    p.display_name,
    p.city,
    p.bio,
    p.avatar_key,
    --- El telefono solo si el artista lo autorizó (Ley 1581).
    case when p.whatsapp_public then p.phone_e164 end as whatsapp
from public.profiles p
where p.status = 'approved';

create view public.public_artworks
with (security_barrier = true)
as
select
    a.id,
    a.title,
    a.description,
    a.year,
    a.dimensions,
    a.image_key,
    a.width,
    a.height,
    a.dominant_color,
    a.approved_at,
    c.slug as category_slug,
    c.name as category_name,
    a.artist_id,
    pa.display_name as artist_name,
    pa.city as artist_city,
    pa.whatsapp as artist_whatsapp
from public.artworks a
-- join con la VISTA de artistas: si el artista no está aprobado, su obra no aparece.
join public.public_artists pa on pa.id = a.artist_id
join public.categories c on c.id = a.category_id and c.active
where a.status = 'approved';

-- Supabase da TODOS los permisos por defecto: se quitan y se deja solo lectura.
revoke all on public.public_artists, public.public_artworks from anon, authenticated;
grant select on public.public_artists, public.public_artworks to anon, authenticated;

