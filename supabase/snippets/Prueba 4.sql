begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000c","role":"authenticated"}';
insert into public.artworks (artist_id, category_id, title)
values ('00000000-0000-0000-0000-00000000000c', (select id from public.categories limit 1), 'Mi obra');
rollback;