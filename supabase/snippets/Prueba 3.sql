begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000b","role":"authenticated"}';
update public.profiles set role = 'admin' where id = '00000000-0000-0000-0000-00000000000b';
rollback;
