<script setup lang="ts">

import {ref} from "vue";
import TestAreaGrowable from "@/components/atoms/TextAreaGrowable/TestAreaGrowable.vue";
import {storeToRefs} from "pinia";
import {useChatStore} from "@/store/chat.ts";
import {CIcon} from "@coreui/icons-vue";
import {CForm} from "@coreui/vue";
import LoadingButton from "@/components/atoms/LoadingButton/LoadingButton.vue";

const content = ref('');
const style = ref('');

const {generatingInProgress} = storeToRefs(useChatStore());

const {threadId} = defineProps<{
  threadId: string,
}>();


const promptForm = ref(null);

const emit = defineEmits(['promptSent']);

const onPromptSent = async () => {
  console.log('inner submit')
  emit('promptSent', content.value);
  content.value = '';
}

const onEnter = (event) => {
  if (!event.shiftKey) {
    event.preventDefault();
    onPromptSent();
  }
}

</script>

<template>
  <div class="chat-prompt d-flex">
    <CForm @submit.prevent="onPromptSent"
           class="w-full"
           ref="promptForm"
    >
      <div class="chat-prompt__entry">
        <TestAreaGrowable
            v-model="content"
            @keydown.enter="onEnter"
            :label="$t('chat.placeholder')"/>
        <LoadingButton
            color="primary"
            class="chat-prompt__prompt-button"
            :loading="generatingInProgress?.[threadId]?.content"
            :disabled="content.length === 0"
            type="submit"
        >
          <CIcon icon="cilSend"/>
        </LoadingButton>
      </div>
    </CForm>
  </div>
</template>

<style lang="scss">
.chat-prompt {
  $borderRadius: 24px;
  position: relative;
  background: white;
  margin: auto auto 0 auto;
  box-shadow: 0 3px 34px -22px rgb(74, 114, 233);
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  border-radius: $borderRadius;
  margin-bottom: 20px;
  z-index: 102;

  &__prompt-button {
      position: absolute;
      top: 5px;
      right: 5px;
      height: calc(100% - 10px);
      background: var(--color-primary);
      padding: 10px;
      border-radius: $borderRadius !important;
    svg {
      height: 15px;
    }
  }

  &__entry {
    position: relative;
    padding: 10px 0;
  }

  @media (max-width: 768px) {
    &__entry {
      button {
        width: 45px;
      }
    }
  }
}
</style>