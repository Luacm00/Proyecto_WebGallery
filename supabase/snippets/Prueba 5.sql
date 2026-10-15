begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}';
select display_name, status from public.profiles;  -- esperado: 3 filas
update public.profiles set status = 'approved'
where id = '00000000-0000-0000-0000-00000000000c'
returning display_name, status;                    -- esperado: Beto, approved
rollback;
