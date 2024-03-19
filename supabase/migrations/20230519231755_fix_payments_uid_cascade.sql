alter table "public"."payments" drop constraint "payments_uid_fkey";

alter table "public"."payments" add constraint "payments_uid_fkey" FOREIGN KEY (uid) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."payments" validate constraint "payments_uid_fkey";


