drop trigger if exists "on_prompt_created_insert_empty_response" on "public"."chat_prompt";

alter table "public"."chat_response" add column "status" text default 'success'::text;

alter table "public"."profile" add column "language" text default 'cs'::text;


