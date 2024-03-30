<script setup lang="ts">

import {useI18n} from "vue-i18n";
import {computed} from "vue";

const i18n = useI18n();
const { t } = i18n;

</script>

<template>
  <p class="no-response d-flex flex-column text-center w-full">
        <span class="d-flex justify-content-center align-items-center">
          {{ $t(`templates.noContent`) }}
        </span>
  </p>
</template>

<style lang="scss">
html {
}

.chat-content {
  &__skeleton {
    margin: 20px;
    width: calc(100% - 40px) !important;
    height: 50vh !important;
  }

  &__suggestion-prompts {
    width: 100%;
    max-width: 900px;
  }

  &__fog {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(58, 57, 57, 0.29);
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__no-tokens {
    padding-bottom: 250px !important;
  }
}

.content-wrapper {
  width: 100%;
  flex: 1 1 auto;
  padding-bottom: 50px;
  scroll-behavior: auto;

  li {
    cursor: text;
  }

  button.no-tokens {
    padding: 5px 15px;
    background: var(--cui-primary);
    border: none;
    color: white;
  }

  .subscription-type {
    background: var(--cui-body-color);
    padding: 4px 10px;
    margin-left: 10px;
    border-radius: 10px;
    color: white;
    font-size: 12px;
  }

  #anchor {
    overflow-anchor: auto;
    min-height: 80px;
    height: 80px;
    width: 100%;
  }

  * {
    overflow-anchor: none;
  }

  .no-response {
    font-size: 32px;
    color: rgba(208, 205, 205, 0.41);
    font-weight: 600;
  }

  @media(max-width: 768px) {
    padding-top: 50px;
  }
}

</style>