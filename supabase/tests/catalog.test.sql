-- Pruebas del catálogo público: vistas public_artists y public_artworks.
begin;

create extension if not exists pgtap
with
    schema extensions;

select
    plan (8);

-- Preparación (como postgres): Ana sin WhatsApp público, y obras que NO deben verse.
update public.profiles
set
    whatsapp_public = false
where
    id = '00000000-0000-0000-0000-00000000000b';

insert into
    public.categories (slug, name, active)
values
    ('categoria-oculta', 'Oculta', false);

insert into
    public.artworks (
        id,
        artist_id,
        category_id,
        title,
        image_key,
        status
    )
values
    (
        '00000000-0000-0000-0000-0000000000e1',
        '00000000-0000-0000-0000-00000000000b',
        (
            select
                id
            from
                public.categories
            where
                slug = 'categoria-prueba'
        ),
        'Pendiente de Ana',
        'ana/p.webp',
        'pending'
    ),
    (
        '00000000-0000-0000-0000-0000000000e2',
        '00000000-0000-0000-0000-00000000000c',
        (
            select
                id
            from
                public.categories
            where
                slug = 'categoria-prueba'
        ),
        'De Beto (pendiente)',
        'beto/b.webp',
        'approved'
    ),
    (
        '00000000-0000-0000-0000-0000000000e3',
        '00000000-0000-0000-0000-00000000000b',
        (
            select
                id
            from
                public.categories
            where
                slug = 'categoria-oculta'
        ),
        'En categoría oculta',
        'ana/o.webp',
        'approved'
    );

-- 1 y 2: las columnas privadas no existen en la vista.
select
    hasnt_column (
        'public',
        'public_artists',
        'full_name',
        'catálogo: public_artists no expone full_name'
    );

select
    hasnt_column (
        'public',
        'public_artists',
        'phone_e164',
        'catálogo: public_artists no expone phone_e164'
    );

set
    local role anon;

-- 3: de los 4 casos, el visitante solo ve la obra aprobada de Ana en categoría activa.
select results_eq(
    $$ select id from public.public_artworks
        where id in ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000e3') $$,
    $$ values ('00000000-0000-0000-0000-0000000000f1'::uuid) $$,
    'catálogo: solo obras aprobadas, de artistas aprovados, en categorías activas'
);

-- 4: anon NO puede modificar a través de la vista (cierra la trampa de los permisos por defecto).
select throws_ok(
  $$ update public.public_artists set display_name = 'Hackeado'
     where id = '00000000-0000-0000-0000-00000000000b' $$,
  '42501', null,
  'catálogo: anon no puede modificar public_artists'
);

-- 5: Beto (pendiente) no aparece como artista público.
select is_empty(
  $$ select id from public.public_artists where id = '00000000-0000-0000-0000-00000000000c' $$,
  'catálogo: un artista pendiente no es público'
);

-- 6: anon sigue sin poder leer la tabla real.
select is_empty($$ select id from public.artworks $$, 'catálogo: anon no lee la tabla artworks');

-- 7: sin autorización, el WhatsApp sale null.
select is(
  (select artist_whatsapp from public.public_artworks where id = '00000000-0000-0000-0000-0000000000f1'),
  null,
  'catálogo: sin autorización no se muestra el WhatsApp'
); 

-- 8: con autorización, sí se muestra. (Modificar el perfil requiere volver a ser postgres.)
reset role;
update public.profiles set whatsapp_public = true where id = '00000000-0000-0000-0000-00000000000b';
set local role anon;

select is(
  (select artist_whatsapp from public.public_artworks where id = '00000000-0000-0000-0000-0000000000f1'),
  '+573000000002',
  'catálogo: con autorización se muestra el WhatsApp'
);

select * from finish();
rollback;