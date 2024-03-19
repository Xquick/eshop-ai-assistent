alter table "public"."chat_response" add column "chat_id" bigint;

alter table "public"."chat_response" add constraint "chat_response_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE not valid;

alter table "public"."chat_response" validate constraint "chat_response_chat_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_chat_prompt(chat_id_input integer, content_input text)
 RETURNS SETOF chat_prompt_with_response
 LANGUAGE plpgsql
AS $function$
  declare
    p_id int;
    r_id int;
  begin

  insert into chat_prompt(chat_id, text)
  values(chat_id_input,content_input) returning id into p_id;

  insert into chat_response(text, prompt_id, chat_id)
  values('', p_id, chat_id_input) returning id into r_id;
  
  update chat_prompt set response_id = r_id where id = p_id;

  return query
  select p_id as prompt_id, r_id as response_id, chat_id_input as chat_id, content_input as prompt_content, '' as response_content;

end;
$function$
;


