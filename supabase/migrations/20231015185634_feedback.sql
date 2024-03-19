alter table "public"."chat_response" add column "feedback_helpful" boolean;

alter table "public"."chat_response" add column "feedback_ok" boolean;

alter table "public"."chat_response" add column "feedback_text" text;

alter table "public"."chat_response" add column "feedback_truthful" boolean;

alter table "public"."chat_response" alter column "status" set default 'processing'::text;


