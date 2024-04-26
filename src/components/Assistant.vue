<script setup lang="ts">
import {onMounted, provide, ref} from "vue";
import Chat from "@/components/Chat/Chat.vue";
import {createMessage, createThread, listMessages} from "@/services/http.service.ts";
import {useGtag} from "vue-gtag-next";

const input = ref<HTMLInputElement>();

const threadId = ref();

const messages = ref([]);
const {event} = useGtag();
const onPromptSent = async (message: string) => {
  messages.value.push({
    content: message,
    role: 'user'
  });

  messages.value.push({
    content: '',
    role: 'assistant'
  });

  function buildHtmlProduct({ name, image_url, price, description}) {
    return `
      <div>
        <h3>${name}</h3>
        <img src="${image_url}" alt="${name}" />
        <p>${description}</p>
        <p>${price}</p>
      </div>
    `;
  }

  let capturingJSON = false;
  let jsonString = '';
  let buffer = '';
  let braceCount = 0;

  const handleTextChunk = (textChunk: string) => {
    buffer += textChunk;  // Append the incoming chunk to the buffer

    // Process the buffer while we might have JSON or regular text to handle
    while (true) {
      if (!capturingJSON) {
        // Look for the start of JSON data
        const startIndex = buffer.indexOf('```json');
        if (startIndex !== -1) {
          // Start capturing JSON
          capturingJSON = true;
          buffer = buffer.substring(startIndex + 7);  // Adjust the buffer to remove the JSON start token
          continue;  // Continue to check the rest of the buffer
        } else {
          // No JSON start token, handle all current buffer as normal text if it can't be part of a split token
          if (buffer.endsWith('```jso') || buffer.endsWith('```js') || buffer.endsWith('```j') || buffer.endsWith('```')) {
            // Potential start of JSON in the next chunk, wait for more data
            break;
          } else {
            // Normal text, safe to append and clear buffer
            messages.value[messages.value.length - 1].content += buffer;
            buffer = '';
            break;
          }
        }
      } else {
        // Currently capturing JSON
        let i = 0;
        while (i < buffer.length) {
          if (buffer[i] === '{') {
            braceCount++;
          } else if (buffer[i] === '}') {
            braceCount--;
            if (braceCount === 0 && capturingJSON) {  // Check if a complete JSON object has ended
              // Include the current character before processing
              jsonString += buffer.substring(0, i + 1);
              try {
                // Process and append JSON
                const parsedJSON = JSON.parse(jsonString);
                messages.value[messages.value.length - 1].content += buildHtmlProduct(parsedJSON) + "\n";
              } catch (e) {
                // Fallback if JSON parsing fails
                messages.value[messages.value.length - 1].content += jsonString;
              }
              jsonString = '';  // Reset jsonString for the next object
              buffer = buffer.substring(i + 1);
              continue;  // Start processing the next part of the buffer
            }
          }
          jsonString += buffer[i];
          i++;
        }
        if (braceCount === 0 && buffer.endsWith('```')) {  // Check for end of JSON data array
          capturingJSON = false;
          buffer = '';  // Clear buffer after processing all JSON
        } else {
          // If there's still data left but no complete object or array end, wait for more data
          buffer = buffer.substring(i);
          break;
        }
      }
    }
  };

  await createMessage(threadId.value, message, handleTextChunk);

  event('generate_text', {
    'event_category': 'generate',
    'event_label': 'text'
  })
}

onMounted(async () => {
  let localThreadId = localStorage.getItem('blueai_thread_id');

  if (!localThreadId) {
    const response = await createThread();
    const responseData = await response.json();
    localThreadId = responseData.thread_id;

    localStorage.setItem('blueai_thread_id', localThreadId);
  }

  threadId.value = localThreadId;

  const response = await listMessages(threadId.value);
  const messagesResponse = await response.json();

  messages.value = messagesResponse.data.map((messageItem) => {
    return {
      content: messageItem.content[0].text.value,
      role: messageItem.role
    }
  });
})

</script>

<template>
  <div class="assistant">
    <div class="assistant__close" @click="$emit('close')">x</div>
    <Chat
        :thread-id="threadId"
        :messages="messages"
        @prompt-sent="onPromptSent"/>
  </div>
</template>

<style scoped lang="scss">
.assistant {
  position: relative;
  background: white;
  overflow: hidden;
  transition: all 0.15s;
  border: 3px solid var(--color-primary);
  border-radius: 30px;
  box-shadow: 0 0 15px -3px rgba(0, 0, 0, 0.1);

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  &__input {
    position: relative;
    width: 100%;
    margin-top: auto;
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 10px;

    input {
      outline: none;
    }
  }
}
</style>
