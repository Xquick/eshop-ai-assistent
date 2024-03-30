<template>
  <CButton :disabled="loading || disabled"
           :color="color"
           class="loading-button">
    <span v-if="loading">
      <Spinner />
    </span>
    <slot v-else></slot>
  </CButton>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import {CButton} from "@coreui/vue";
import Spinner from "@/components/atoms/Spinner/Spinner.vue";

// Define props with TypeScript types
const props = defineProps<{
  loading: boolean,
  disabled: boolean,
  color: string,
}>()
</script>

<style>
.loading-button[disabled] {
  opacity: 0.6;
  pointer-events: none;
}
</style>
