-- Corrige la tilde del nombre visible de la categoría Acrílico.
update public.categories
set name = 'Acrílico'
where slug = 'acrilico';