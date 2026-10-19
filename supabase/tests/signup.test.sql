-- Pruebas del registro: trigger handle_new_user.
begin;
create extension if not exists pgtap with schema extensions;

select plan(6);

-- Un registro que intenta hacerse admin y trae espacios y ciudad vacía.
insert into auth.users (id, email, raw_user_meta_data) values (
    '00000000-0000-0000-0000-0000000000d1', 'nueva@test.local', '{"display_name":" Nueva ","full_name":"Nueva Artista","phone_e164":"+573001112233","city":"","data_consent":true,"role":"admin","status":"approved"}'
);

select results_eq(
    $$ select role::text, status::text, display_name, city
        from public.profiles where id = '00000000-0000-0000-0000-0000000000d1' $$,
    $$ values ('artist', 'pending', 'Nueva', null::text) $$,
    'registro: crea artist/pending (ignora role/status del cliente), limpia espacios y ciudad vacía'
);

select isnt(
    (select data_consent_at from public.profiles where id = '00000000-0000-0000-0000-0000000000d1'), null, 'registro: guarda la fecha del consentimiento'
);

select throws_ok(
    $$ insert into auth.users (id, email, raw_user_meta_data) values (
        '00000000-0000-0000-0000-0000000000d2', 'sin-consentimiento@test.local', '{"display_name":"Xx","full_name":"Xx Prueba","phone_e164":"+573001112233"}') $$,
        '23514', null,
        'registro: sin consentimiento no se crea la cuenta'
);

--   4) Teléfono SIN formato E.164 (p. ej. "3001112233", sin +57) → throws_ok con '23514'
--      Usa un id nuevo (…d3) y un email nuevo. ¿Qué check de la tabla lo rechaza?
--    (patrón '^\+[1-9][0-9]{7,14}$': exige el + y el indicativo).
select throws_ok(
    $$ insert into auth.users (id, email, raw_user_meta_data) values (
        '00000000-0000-0000-0000-0000000000d3', 'telefono-malo@test.local', '{"display_name":"Yy","full_name":"Yy Prueba","phone_e164":"3001112233","data_consent":true}') $$,
        '23514', null,
        'registro: rechaza un teléfono sin formato E.164'
);

--   5) Sin display_name (quita esa clave del JSON) → throws_ok con '23502' (not_null_violation)
select throws_ok(
    $$ insert into auth.users (id, email, raw_user_meta_data) values ('00000000-0000-0000-0000-0000000000d4', 'sin-nombre@test.local', '{"full_name":"Zz Prueba","phone_e164":"+573001112233","data_consent":true}') $$,
    '23502', null,
    'registro: exige display_name'
);

--   6) Los registros fallidos NO dejan usuarios huérfanos:
--      is( (select count(*) from auth.users where id in ('…d2','…d3','…d4')), 0::bigint, '...')
--      Piensa: si el trigger falló, ¿por qué tampoco existe la fila en auth.users?
select is(
    (select count(*) from auth.users
    where id in ('00000000-0000-0000-0000-0000000000d2',
                 '00000000-0000-0000-0000-0000000000d3',
                 '00000000-0000-0000-0000-0000000000d4')),
    0::bigint,
    'registro: los intentos fallidos no dejan usuarios huérfanos'
);

select * from finish();
rollback;