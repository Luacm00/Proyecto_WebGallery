begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000b","role":"authenticated"}';
select title, status from public.artworks;
update public.artworks set title = 'Anochecer' 
where id = '00000000-0000-0000-0000-0000000000f1'
returning title, status;
rollback;