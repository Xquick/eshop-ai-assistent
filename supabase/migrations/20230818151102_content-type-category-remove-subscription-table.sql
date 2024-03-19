drop policy "Enable read access for all users" on "public"."app";

drop policy "Enable delete for users based on user_id" on "public"."subscription";

alter table "public"."subscription" drop constraint "subscription_uid_fkey";

alter table "public"."app" drop constraint "app_pkey";

alter table "public"."subscription" drop constraint "accounts_pkey";

drop index if exists "public"."accounts_pkey";

drop index if exists "public"."app_pkey";

drop table "public"."app";

drop table "public"."subscription";

alter table "public"."content_type" add column "category" text default 'text'::text;


drop policy "Allow all 1ffg0oo_0" on "storage"."objects";

drop policy "Allow all 1ffg0oo_1" on "storage"."objects";

drop policy "Allow all 1ffg0oo_2" on "storage"."objects";

drop policy "Allow all 1ffg0oo_3" on "storage"."objects";

create policy "Give users access to own folder 1ffg0oo_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'images'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1ffg0oo_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'images'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1ffg0oo_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'images'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1ffg0oo_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'images'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



