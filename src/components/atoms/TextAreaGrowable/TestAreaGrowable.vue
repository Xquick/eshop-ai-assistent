<script setup lang="ts">
import {ref, watch} from "vue";

const text = defineModel();
const { label } = defineProps<{
  label: string
}>();

const growWrap = ref(null);

watch(text, (newText) => {
  growWrap.value.dataset.replicatedValue = newText
})

</script>

<template>
  <div class="grow-wrap" ref="growWrap">
    <textarea name="text"
              v-model="text"
              rows="1"
              id="text"
              :placeholder="label"></textarea>
  </div>
</template>

<style lang="scss">

$maxHeight: 300px;

textarea::-webkit-scrollbar-track {
  box-shadow: none;
  background: transparent;
  border: none;
}
textarea::-webkit-scrollbar {
  width: 2px;
  background: none;
}
textarea::-webkit-scrollbar-thumb {
  background-color: #dfe4f4;
  border-radius: 5px;
}

.grow-wrap {
  /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
  display: grid;
  margin: 4px 0 4px 20px !important;

  max-height: $maxHeight;
  word-break: break-all;
  max-width: calc(100% - 130px) !important;
  padding: 0 !important;

  &::after {
    /* Note the weird space! Needed to preventy jumpy behavior */
    content: attr(data-replicated-value) " ";

    /* This is how textarea text behaves */
    white-space: pre-wrap;

    /* Hidden from view, clicks, and screen readers */
    visibility: hidden;
    max-height: $maxHeight;
    padding-right: 8px;
  }

  & > textarea {
    &:focus{
      outline: 0;
    }
    resize: none;
    padding: 0;
    /* Firefox shows scrollbar on growth, you can hide like this. */
    overflow-y: auto;
    color: var(--cui-input-color, rgba(44, 56, 74, 0.95));
    background-clip: padding-box;
    border: none;
    background-color: var(--cui-input-bg, #fff);
    max-height: $maxHeight;
  }

  &> textarea,
  &::after {
    /* Identical styling required!! */
    /* Place on top of each other */
    grid-area: 1 / 1 / 2 / 2;
  }

  @media (max-width: 768px) {
    max-width: calc(100% - 100px) !important;
  }
}
</style>