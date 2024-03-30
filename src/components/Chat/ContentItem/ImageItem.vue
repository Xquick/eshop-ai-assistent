<script setup lang="ts">
import {Status} from "@backend/functions/_shared/model/general.ts";
import ImageSecure from "@/components/atoms/ImageSecure/ImageSecure.vue";
import PlaceholderImage from "@/components/atoms/PlaceholderImage/PlaceholderImage.vue";

const {content, status} = defineProps<{
  content: string,
  status: string
}>();

</script>

<template>
  <div class="image-item flex-column d-flex justify-content-center w-full">
    <template v-if="content">
      <ImageSecure v-if="status === Status.SUCCESS" :image="content"/>
      <span v-if="status === Status.FAILED">{{ $t(`ui.image.status.error`) }}</span>
    </template>

    <PlaceholderImage v-else :text="$t('ui.image.generating')"/>
  </div>
</template>

<style lang="scss">

</style>