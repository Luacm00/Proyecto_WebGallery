-- Pruebas de seguridad: RLS + triggers de protección.
-- Usan los usuarios de seed.sql: admin (_0a), Ana aprobada (_0b), Beto pendiente (_0c)
begin;
create extension if not exists pgtap with schema extensions;

select plan(12);

-- ---------------------------------------------------------
-- Visitante anónimo
-- ---------------------------------------------------------

set local role anon;

select is((select count(*) from public.profiles), 0::bigint, 'anon: no ve perfiles');
select is((select count(*) from public.artworks), 0::bigint, 'anon: no ve obras');
select is(
    (select count(*) from public.categories where slug = 'oleo'), 1::bigint,
    'anon: ve las categorias activas'
);

reset role; --vuelve a postgres antes de cambiar de usuario

-- ---------------------------------------------------------
-- Ana (artista aprobada)
-- ---------------------------------------------------------
set local role authenticated;
set local request.jwt.claims = '{"sub": "00000000-0000-0000-0000-00000000000b", "role":"authenticated"}';

select results_eq(
    $$ insert into public.artworks (artist_id, category_id, title, status)
        values ('00000000-0000-0000-0000-00000000000b',
            (select id from public.categories limit 1),'Trampa', 'approved')
        returning status::text $$,
    $$ values ('uploading') $$,
    'Ana: su obra nace en uploading aunque envie approved'
);

select throws_ok(
    $$ update public.profiles set role = 'admin'
        where id = '00000000-0000-0000-0000-00000000000b' $$,
    '42501',
    'No tienes permiso para cambiar el rol o el estado del perfil',
    'Ana: no puede hacerse admin'
);

select is(
    (select count(*) from public.profiles), 1::bigint, 
    'Ana: solo ve su perfil'
);

select results_eq(
    $$ update public.artworks set title = 'Anochecer'
        where id = '00000000-0000-0000-0000-0000000000f1'
        returning status::text $$,
    $$ values ('pending') $$,
    'Ana: editar el titulo de su obra aprobada la deja en pending'
);

select throws_ok(
    $$ insert into public.artworks (artist_id, category_id, title)
        values ('00000000-0000-0000-0000-00000000000c',
        (select id from public.categories limit 1), 'Mi nueva obra') $$,
        '42501',
        null,
        'Ana: No puede crear una obra con artist_id de Beto'
);

select throws_ok(
    $$ update public.artworks set status = 'hidden'
        where id = '00000000-0000-0000-0000-0000000000f1' $$,
    '42501',
    'No puedes cambiar el estado de la obra',
    'Ana: No puede cambiar el status de su obra'
);

reset role;

-- ---------------------------------------------------------
-- Beto (artista pendiente)
-- ---------------------------------------------------------

set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000c", "role":"authenticated"}';

select throws_ok(
    $$ insert into public.artworks (artist_id, category_id, title)
        values ('00000000-0000-0000-0000-00000000000c', (select id from public.categories limit 1), 'Mi obra') $$,
        '42501',
        null,
        'Beto: No puede crear obras, usuario pendiente'
);

reset role;

-- ---------------------------------------------------------
-- Admin
-- ---------------------------------------------------------

set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000a", "role":"authenticated"}';

select is(
    (select count(*) from public.profiles 
    where id in ('00000000-0000-0000-0000-00000000000a',
                '00000000-0000-0000-0000-00000000000b',
                '00000000-0000-0000-0000-00000000000c')),
    3::bigint,
    'Admin: ve todos los perfiles'
);

select results_eq(
    $$ update public.profiles set status = 'approved'
        where id = '00000000-0000-0000-0000-00000000000c'
        returning status::text $$,
    $$ values ('approved') $$,
    'El admin puede aprobar usuarios'
);

select * from finish();
rollback;