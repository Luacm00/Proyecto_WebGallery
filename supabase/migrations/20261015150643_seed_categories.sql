-- Las 5 técnicas iniciales. Datos de referencia: van a producción.
-- "on conflict do nothing" = si el slug ya existe, no falla ni duplica (idempotente).
insert into public.categories (slug, name, sort_order, description, how_to, materials) values
  (
    'oleo', 'Óleo', 1,
    'El óleo es una técnica de pintura que utiliza pigmentos mezclados con aceites. Es conocida por su capacidad de crear detalles y su durabilidad.',
    'Se aplica sobre lienzo, madera o paneles, utilizando pinceles, espátulas y otros utensilios.',
    'Pigmentos de óleo, aceites (como aceite de linaza), lienzos o paneles, pinceles, y medios para mezclar.'
  ),
  (
    'acrilico', 'Acrilico', 2,
    'La pintura acrílica es conocida por su rápido secado y su
    versatilidad, pudiendo imitar acuarelas, óleos y otros estilos.',
    'Se puede aplicar en lienzo, madera, papel y otros soportes
    usando pinceles, espátulas, o incluso directamente con las manos.',
    'Pinturas acrílicas, pinceles, paletas para mezclar, agua
    para diluir y diversos soportes como lienzo o papel.'
  ),
  (
    'vinilo', 'Vinilo', 3,
    'La pintura vinílica es similar al acrílico, pero con una
    base de acetato de polivinilo. Es muy utilizada en la decoración mural.',
    'Se aplica generalmente en paredes y grandes superficies
    utilizando rodillos, pinceles y aerosoles.',
    'Pintura vinílica, rodillos, pinceles, cintas adhesivas
    para delimitar áreas, y agua para limpiar.'
  ),
  (
    'carboncillo', 'Carboncillo', 4,
    'El carboncillo es una técnica de dibujo que utiliza
    varillas de carbón. Es muy apreciada por sus tonos
    profundos y la capacidad de sombreado.',
    'Se utiliza sobre papel o lienzo, y es ideal para bocetos
    rápidos y dibujos detallados.',
    'Carboncillo, papel especial para carboncillo, goma de
    borrar maleable, fijador para carboncillo.'
  ),
  (
    'tizas-pastel', 'Tizas Pastel', 5,
    'Las tizas pastel son utilizadas para crear obras con
    colores vibrantes y texturas suaves. Es una técnica ideal
    para retratos y paisajes.',
    'Se aplica sobre papel rugoso o liso, permitiendo mezclas
    de colores con los dedos o herramientas especiales.',
    'Tizas pastel, papel para pasteles, fijador para pasteles,
    y herramientas de mezcla como difuminos o esfuminos.'
  )
  
  --    copiando los textos de apps/web/src/componentes/Tecnicas.jsx
on conflict (slug) do nothing;
