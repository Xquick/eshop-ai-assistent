<script setup lang="ts">
import Avatar from "@/components/atoms/Avatar/Avatar.vue";
import {OpenAIRole} from "@/store/chat.ts";
import TextItem from "@/components/Chat/ContentItem/TextItem.vue";

const {id, content, role} = defineProps<{
  id: number,
  content: string,
  role: string,
}>();

</script>

<template>
  <div
      class="content-item d-flex flex-row justify-content-center"
      :class="{
        [role]: true,
        'content-item__response': role === OpenAIRole.ASSISTANT
      }"
  >
    <div class="content-item__content d-flex  flex-column flex-lg-row w-full">
      <section class="d-flex flex-row w-full items-start">
        <Avatar :role="role"
                class="me-3"
                size="sm"/>

        <template v-if="role === OpenAIRole.ASSISTANT">
          <TextItem :content="content"/>
        </template>

        <template v-if="role === OpenAIRole.USER">
          <TextItem class="p-0 w-full mx-3"
                    :content="content"
                    :suggestions="[]"/>
        </template>
      </section>
    </div>
  </div>
</template>

<style lang="scss">

.blueai-products {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  flex-direction: row;
  gap: 20px;

  &__item {
    display: flex;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s;
    max-width: 30%;
    flex-direction: column;
    background: white;

    img {
      order: 1;
      width: 100%;
    }

    &:hover {
      background: #f9f9f9;
    }
  }
}

.blueai-product {
  &__name {
    padding: 10px 10px 0;
    order: 2;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
  }

  &__price {
    padding: 10px;
    order: 3;
    margin-top: 15px;
    font-weight: bold;
  }
}

.content-item {
  width: 100%;
  border-top: 1px solid #efefef;
  padding: 20px 30px;

  &:first-child {
    border-top: none;
  }

  &__response {
    background: #fafafa;
  }

  &__content {
    position: relative;
    max-width: 900px;
    width: 100%;
    margin-left: 10px;

    p {
      padding: 0 0 12px;
    }
  }

  @media(max-width: 768px) {
    .avatar.assistant {
      display: none;
    }

    &.assistant {
      .content-item__content {
        padding-top: 10px;
      }
    }

    &__content {
      margin-left: 0;
      padding-left: 10px !important;
      padding-right: 10px !important;
    }

    &-actions {
      position: relative !important;
      width: 100%;
    }
  }
}
</style>