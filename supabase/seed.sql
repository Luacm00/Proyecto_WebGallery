-- Usuarios de prueba LOCALES, con contraseña y correo ya confirmado,
-- para poder iniciar sesión con ellos en el navegador.
-- Contraseña de los tres: clave-de-prueba
-- ⚠️ Solo seed.sql (local). Nunca se crea así un usuario en producción.
insert into auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at, created_at, updated_at,
  -- Auth falla si estas columnas de texto quedan en null: van vacías.
  confirmation_token, recovery_token, email_change_token_new, email_change,
  email_change_token_current, phone_change, phone_change_token, reauthentication_token,
  raw_app_meta_data, raw_user_meta_data
)
select
  u.id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', u.email,
  extensions.crypt('clave-de-prueba', extensions.gen_salt('bf')), now(), now(), now(),
  '', '', '', '', '', '', '', '',
  '{"provider":"email","providers":["email"]}', u.meta
from (values
  ('00000000-0000-0000-0000-00000000000a'::uuid, 'admin@test.local',
   '{"display_name":"Admin","full_name":"Admin Prueba","phone_e164":"+573000000001","data_consent":true}'::jsonb),
  ('00000000-0000-0000-0000-00000000000b'::uuid, 'ana@test.local',
   '{"display_name":"Ana","full_name":"Ana Prueba","phone_e164":"+573000000002","data_consent":true}'::jsonb),
  ('00000000-0000-0000-0000-00000000000c'::uuid, 'beto@test.local',
   '{"display_name":"Beto","full_name":"Beto Prueba","phone_e164":"+573000000003","data_consent":true}'::jsonb)
) as u(id, email, meta);

-- Después, el "admin" ajusta roles y estados. (El seed corre sin usuario: profiles_guard no lo bloquea.)
update public.profiles set role = 'admin', status = 'approved' where id = '00000000-0000-0000-0000-00000000000a';
update public.profiles set status = 'approved'                 where id = '00000000-0000-0000-0000-00000000000b';
-- Beto queda en 'pending'.

insert into public.categories (slug, name) values ('categoria-prueba', 'Categoría de prueba');

-- Una obra ya aprobada de Ana, para probar que editarla la devuelve a moderación.
insert into public.artworks (id, artist_id, category_id, title, image_key, status, approved_at)
values ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-00000000000b',
        (select id from public.categories where slug = 'categoria-prueba'),
        'Atardecer', 'ana/atardecer.webp', 'approved', now());
