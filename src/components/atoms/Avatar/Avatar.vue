<script setup lang="ts">
import {storeToRefs} from "pinia";
import {CAvatar} from "@coreui/vue";
import {OpenAIRole} from "@/store/chat.ts";

const props = defineProps<{
  size: ('s' | 'lg' | 'xl'),
  role: string
}>()

</script>

<template>
  <img v-if="role === OpenAIRole.ASSISTANT" class="assistant" src="../../../assets/logo-eshop.png" alt=""/>
<!--  <CAvatar v-else-if="avatar?.type === AvatarType.URL"-->
<!--           :src="avatar?.src"-->
<!--           :size="props.size"-->
<!--  />-->
  <CAvatar v-else color="danger"
           textColor="white"
           :size="props.size">
    <strong>Z</strong>
  </CAvatar>
</template>

<style  lang="scss">
  .assistant {
    width: 40px;

    .avatar-img {
      border-radius: 0;
      width: 80%;
    }
  }
  .avatar {
    min-width: 2rem;
    min-height: 2rem;


  }
</style>