<script setup lang="ts">
import {copyToClipboard} from "@/util/clipboard.ts";
import {toast} from "vue3-toastify";
import {useI18n} from "vue-i18n";
import {inject, ref} from "vue";

const {id, content, feedbackOk, status, type} = defineProps<{
  id: number,
  content: string,
  feedbackOk: boolean,
  status: string
  type: string
}>();

const {t} = useI18n()

const feedbackModalVisible = ref(false)
const copyToClipboardHandler = (content) => {
  copyToClipboard(content);
  toast.success(t(`ui.clipboard.success`));
}
const chatId = inject('chatId');

</script>

<template>
  <section class="content-item-actions flex-lg-column d-flex flex-md-row">
    <template>
      <CIcon icon="cilCopy"
             class="content-item-actions__icon"
             size="lg"
             @click="() => copyToClipboardHandler(content)"/>
    </template>
  </section>
</template>

<style lang="scss">
.content-item-actions {
  flex: 0 0 auto;
  padding-left: 20px;

  &__icon {
    color: var(--cui-primary);
    padding: 5px;
    border-radius: 50%;
    width: 32px !important;
    height: 32px !important;
    cursor: pointer;
    margin-bottom: 3px;
    opacity: 0.6;

    &--positive-active {
      .icon {
        opacity: 1;
        background-color: rgb(228 247 196) !important;
        color: #77b40d !important;
      }
    }

    &--negative-active {
      .icon {
        opacity: 1;
        background-color: rgba(254, 226, 226, 1) !important;
        color: rgb(220, 38, 38) !important;
      }
    }

    &:hover {
      opacity: 1;
      background: white;
      box-shadow: 0 0 9px -1px rgb(0, 0, 0, 0.1) !important;
    }
  }

  @media(max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
    top: -10px;
    position: absolute;
    right: 10px;
    justify-content: end;
  }
}
</style>