begin;
set local role anon;
select (select count(*) from public.categories) as categorias,  -- esperado: 1
       (select count(*) from public.profiles)   as perfiles,    -- esperado: 0
       (select count(*) from public.artworks)   as obras;       -- esperado: 0
rollback;


