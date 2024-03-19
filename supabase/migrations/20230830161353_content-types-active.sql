alter table "public"."stripe_customer_id_map" drop constraint "stripe_customer_id_map_pkey";

drop index if exists "public"."stripe_customer_id_map_pkey";

alter table "public"."content_type" add column "active" boolean default true;

CREATE UNIQUE INDEX stripe_customer_id_map_pkey ON public.stripe_customer_id_map USING btree (uid);

alter table "public"."stripe_customer_id_map" add constraint "stripe_customer_id_map_pkey" PRIMARY KEY using index "stripe_customer_id_map_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin

  insert into public.profile (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  insert into public.token (uid, token_count)
  values (new.id, 0);
  return new;
end;
$function$
;


