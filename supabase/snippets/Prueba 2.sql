begin;

set
  local role authenticated;

set
  local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000b","role":"authenticated"}';

select
  display_name
from
  public.profiles;

-- esperado: solo "Ana"
insert into
  public.artworks (artist_id, category_id, title, image_key, status)
values
  (
    '00000000-0000-0000-0000-00000000000b',
    (
      select
        id
      from
        public.categories
      limit
        1
    ),
    'Intento tramposo',
    'ana/atardecer.webp',
    'approved'
  )
returning
  title,
  status;

-- esperado: status = uploading
rollback;