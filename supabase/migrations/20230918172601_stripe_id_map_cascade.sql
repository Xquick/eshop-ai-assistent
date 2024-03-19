alter table "public"."stripe_customer_id_map" alter column "uid" set data type uuid using "uid"::uuid;

alter table "public"."stripe_customer_id_map" add constraint "stripe_customer_id_map_uid_fkey" FOREIGN KEY (uid) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."stripe_customer_id_map" validate constraint "stripe_customer_id_map_uid_fkey";


