<script setup lang="ts">
import {storeToRefs} from "pinia";
import {AvatarType, useUserStore} from "@/store/user.ts";
import {CAvatar} from "@coreui/vue";
import {OpenAIRole} from "@/store/chat.ts";

const userStore = useUserStore();
const props = defineProps<{
  size: ('s' | 'lg' | 'xl'),
  role: string
}>()

const {avatar} = storeToRefs(userStore);
</script>

<template>
  <CAvatar v-if="role === OpenAIRole.ASSISTANT" class="assistant" src="./assets/logo-eshop.png"/>
  <CAvatar v-else-if="avatar?.type === AvatarType.URL"
           :src="avatar?.src"
           :size="props.size"
  />
  <CAvatar v-else color="danger"
           textColor="white"
           :size="props.size">
    <strong>{{ avatar?.initials }}</strong>
  </CAvatar>
</template>

<style  lang="scss">
  .assistant {
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