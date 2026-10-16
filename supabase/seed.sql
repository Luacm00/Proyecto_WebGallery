-- Datos de prueba LOCALES. No se aplican en la nube.
insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-00000000000a', 'admin@test.local'),
  ('00000000-0000-0000-0000-00000000000b', 'ana@test.local'),
  ('00000000-0000-0000-0000-00000000000c', 'beto@test.local');

insert into public.profiles (id, role, status, display_name, full_name, phone_e164, data_consent_at) values
  ('00000000-0000-0000-0000-00000000000a', 'admin',  'approved', 'Admin', 'Admin Prueba', '+573000000001', now()),
  ('00000000-0000-0000-0000-00000000000b', 'artist', 'approved', 'Ana',   'Ana Prueba',   '+573000000002', now()),
  ('00000000-0000-0000-0000-00000000000c', 'artist', 'pending',  'Beto',  'Beto Prueba',  '+573000000003', now());

insert into public.categories (slug, name) values ('categoria-prueba', 'Categoría de prueba');

-- Una obra ya aprobada de Ana, para probar que editarla la devuelve a moderación.
insert into public.artworks (id, artist_id, category_id, title, image_key, status, approved_at)
values ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-00000000000b',
        (select id from public.categories where slug = 'categoria-prueba'),
        'Atardecer', 'ana/atardecer.webp', 'approved', now());
