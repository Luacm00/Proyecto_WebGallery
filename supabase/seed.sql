-- Los usuarios se crean como en un registro real: el trigger crea su perfil (artist/pending).
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000000a', 'admin@test.local',
   '{"display_name":"Admin","full_name":"Admin Prueba","phone_e164":"+573000000001","data_consent":true}'),
  ('00000000-0000-0000-0000-00000000000b', 'ana@test.local',
   '{"display_name":"Ana","full_name":"Ana Prueba","phone_e164":"+573000000002","data_consent":true}'),
  ('00000000-0000-0000-0000-00000000000c', 'beto@test.local',
   '{"display_name":"Beto","full_name":"Beto Prueba","phone_e164":"+573000000003","data_consent":true}');

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
