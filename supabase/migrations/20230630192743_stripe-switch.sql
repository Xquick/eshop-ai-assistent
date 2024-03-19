drop policy "Enable select for users based on user_id" on "public"."payment_log";

drop policy "Enable read access for all users" on "public"."price";

drop policy "Enable read access for all users" on "public"."price_list";

drop policy "Enable read access for all users" on "public"."purchase_type";

drop policy "Enable read access for all users" on "public"."subscription_type";

alter table "public"."chat" drop constraint "chat_content_type_id_fkey";

alter table "public"."chat_prompt_chat_filter" drop constraint "chat_prompt_chat_filter_chat_filter_id_fkey";

alter table "public"."invoice" drop constraint "invoice_uid_fkey";

alter table "public"."payment_log" drop constraint "payment_log_purchase_type_fkey";

alter table "public"."payment_log" drop constraint "payment_log_subscription_type_fkey";

alter table "public"."payment_log" drop constraint "payment_log_uid_fkey";

alter table "public"."price" drop constraint "price_price_list_id_fkey";

alter table "public"."price" drop constraint "price_subscription_type_id_fkey";

alter table "public"."subscription" drop constraint "subscription_price_list_id_fkey";

alter table "public"."subscription" drop constraint "subscription_type_fkey";

alter table "public"."subscription" drop constraint "subscription_type_next_fkey";

alter table "public"."content_type" drop constraint "content_types_pkey";

alter table "public"."invoice" drop constraint "invoice_pkey";

alter table "public"."payment_log" drop constraint "payments_pkey";

alter table "public"."price" drop constraint "subscription_price_pkey";

alter table "public"."price_list" drop constraint "price_list_pkey";

alter table "public"."purchase_type" drop constraint "purchase_types_pkey";

alter table "public"."subscription_type" drop constraint "service_types_pkey";

alter table "public"."chat_filter" drop constraint "chat_filter_pkey";

drop index if exists "public"."content_types_pkey";

drop index if exists "public"."invoice_pkey";

drop index if exists "public"."payments_pkey";

drop index if exists "public"."price_list_pkey";

drop index if exists "public"."purchase_types_pkey";

drop index if exists "public"."service_types_pkey";

drop index if exists "public"."subscription_price_pkey";

drop index if exists "public"."chat_filter_pkey";

drop table "public"."invoice";

drop table "public"."payment_log";

drop table "public"."price";

drop table "public"."price_list";

drop table "public"."purchase_type";

drop table "public"."subscription_type";

create table "public"."chat_filter_value" (
    "id" bigint generated by default as identity not null,
    "value" text,
    "chat_filter_name" text
);


alter table "public"."chat_filter_value" enable row level security;

create table "public"."content_type_chat_filter" (
    "id" bigint generated by default as identity not null,
    "content_type" text,
    "chat_filter_name" text,
    "default_value" text
);


alter table "public"."content_type_chat_filter" enable row level security;

create table "public"."stripe_customer_id_map" (
    "uid" text not null,
    "stripe_customer_id" text not null
);


alter table "public"."stripe_customer_id_map" enable row level security;

alter table "public"."chat" drop column "content_type_id";

alter table "public"."chat" add column "content_type" text;

alter table "public"."chat_filter" drop column "id";

alter table "public"."chat_filter" alter column "name" set not null;

alter table "public"."chat_filter" enable row level security;

alter table "public"."chat_prompt_chat_filter" drop column "chat_filter_id";

alter table "public"."chat_prompt_chat_filter" add column "chat_filter_name" text;

alter table "public"."chat_prompt_chat_filter" add column "filter_value" text;

alter table "public"."content_type" drop column "icon";

alter table "public"."content_type" drop column "id";

alter table "public"."content_type" alter column "type" set not null;

alter table "public"."content_type" alter column "type" set data type text using "type"::text;

alter table "public"."subscription" drop column "payment_recurring_at";

alter table "public"."subscription" drop column "payment_recurring_id";

alter table "public"."subscription" drop column "price_list_id";

alter table "public"."subscription" drop column "starts_at";

alter table "public"."subscription" drop column "type";

alter table "public"."subscription" drop column "type_next";

alter table "public"."subscription" add column "stripe_subscription_id" text;

CREATE UNIQUE INDEX chat_filter_values_pkey ON public.chat_filter_value USING btree (id);

CREATE UNIQUE INDEX content_type_chat_filter_pkey ON public.content_type_chat_filter USING btree (id);

CREATE UNIQUE INDEX content_type_pkey ON public.content_type USING btree (type);

CREATE UNIQUE INDEX stripe_customer_id_map_pkey ON public.stripe_customer_id_map USING btree (stripe_customer_id, uid);

CREATE UNIQUE INDEX chat_filter_pkey ON public.chat_filter USING btree (name);

alter table "public"."chat_filter_value" add constraint "chat_filter_values_pkey" PRIMARY KEY using index "chat_filter_values_pkey";

alter table "public"."content_type" add constraint "content_type_pkey" PRIMARY KEY using index "content_type_pkey";

alter table "public"."content_type_chat_filter" add constraint "content_type_chat_filter_pkey" PRIMARY KEY using index "content_type_chat_filter_pkey";

alter table "public"."stripe_customer_id_map" add constraint "stripe_customer_id_map_pkey" PRIMARY KEY using index "stripe_customer_id_map_pkey";

alter table "public"."chat_filter" add constraint "chat_filter_pkey" PRIMARY KEY using index "chat_filter_pkey";

alter table "public"."chat" add constraint "chat_content_type_fkey" FOREIGN KEY (content_type) REFERENCES content_type(type) not valid;

alter table "public"."chat" validate constraint "chat_content_type_fkey";

alter table "public"."chat_filter_value" add constraint "chat_filter_value_chat_filter_name_fkey" FOREIGN KEY (chat_filter_name) REFERENCES chat_filter(name) not valid;

alter table "public"."chat_filter_value" validate constraint "chat_filter_value_chat_filter_name_fkey";

alter table "public"."chat_prompt_chat_filter" add constraint "chat_prompt_chat_filter_chat_filter_name_fkey" FOREIGN KEY (chat_filter_name) REFERENCES chat_filter(name) not valid;

alter table "public"."chat_prompt_chat_filter" validate constraint "chat_prompt_chat_filter_chat_filter_name_fkey";

alter table "public"."content_type_chat_filter" add constraint "content_type_chat_filter_chat_filter_name_fkey" FOREIGN KEY (chat_filter_name) REFERENCES chat_filter(name) not valid;

alter table "public"."content_type_chat_filter" validate constraint "content_type_chat_filter_chat_filter_name_fkey";

alter table "public"."content_type_chat_filter" add constraint "content_type_chat_filter_content_type_fkey" FOREIGN KEY (content_type) REFERENCES content_type(type) not valid;

alter table "public"."content_type_chat_filter" validate constraint "content_type_chat_filter_content_type_fkey";

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
  insert into public.subscription (uid)
  values (new.id);
  return new;
end;
$function$
;

create policy "Enable read access for all users"
on "public"."chat_filter"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."chat_filter_value"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."content_type_chat_filter"
as permissive
for select
to public
using (true);



create policy "Allow all 1ffg0oo_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'images'::text));


create policy "Allow all 1ffg0oo_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'images'::text));


create policy "Allow all 1ffg0oo_2"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'images'::text));


create policy "Allow all 1ffg0oo_3"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'images'::text));


