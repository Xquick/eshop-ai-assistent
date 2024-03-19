drop policy "Enable delete for users based on user_id" on "public"."profile";

drop policy "Enable delete for users based on user_id" on "public"."token";

drop policy "Enable delete for users based on user_id" on "public"."token_movement";

alter table "public"."chat_prompt" enable row level security;

alter table "public"."chat_prompt_chat_filter" enable row level security;

alter table "public"."chat_response" drop column "cdn";

alter table "public"."chat_response" enable row level security;

create policy "Enable all actions for auth users"
on "public"."chat_prompt"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM chat c
  WHERE ((c.id = chat_prompt.chat_id) AND (c.uid = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM chat c
  WHERE ((c.id = chat_prompt.chat_id) AND (c.uid = auth.uid())))));


create policy "Read all"
on "public"."chat_prompt_chat_filter"
as permissive
for select
to public
using (true);


create policy "Enable all actions for auth users"
on "public"."chat_response"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM chat c
  WHERE ((c.id = chat_response.chat_id) AND (c.uid = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM chat c
  WHERE ((c.id = chat_response.chat_id) AND (c.uid = auth.uid())))));


create policy "Enable select for auth users"
on "public"."profile"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Enable select for auth users"
on "public"."token"
as permissive
for select
to public
using ((auth.uid() = uid));


create policy "Enable select for auth users"
on "public"."token_movement"
as permissive
for select
to public
using ((auth.uid() = uid));



