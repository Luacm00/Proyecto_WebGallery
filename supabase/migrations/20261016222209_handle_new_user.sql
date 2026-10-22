-- =========================================================
-- Crea el perfil del artista cuando alguien se registra en Supabase Auth.
-- Los datos llegan desde signUp({ options: { data: {...} } }) en raw_user_meta_data.
-- ⚠️ raw_user_meta_data lo controla el usuario: nunca se leen role ni status de ahí.
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
    -- Variable local: el JSON del formulario (o {} si viene vacio).
    meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
    -- Ley 1581: sin autorización expresa no se crea la cuenta.
    if not coalesce((meta ->> 'data_consent')::boolean, false) then
        raise exception 'Se requiere autorización para el tratamiento de datos personales'
            using errcode = '23514'; --check_violation
    end if;

    insert into public.profiles (
        id, display_name, full_name, phone_e164, city, whatsapp_public, data_consent_at
    ) values (
        new.id,
        trim(meta ->> 'display_name'),
        trim(meta ->> 'full_name'),
        meta ->> 'phone_e164',
        nullif(trim(meta ->> 'city'), ''), --"" se guarda como null
        coalesce((meta ->> 'whatsapp_public')::boolean, false),
        now()
    );
    -- role y status no se mencionan: toman sus defaults ('artist', 'pending').

    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();