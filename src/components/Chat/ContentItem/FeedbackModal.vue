<script setup lang="ts">
import {CButton, CForm, CFormCheck, CFormLabel, CFormTextarea, CModal, CModalBody, CModalHeader, CModalFooter} from "@coreui/vue";
import {computed, ref} from "vue";
import {IFeedbackPayload} from "@/services/http.service.ts";
import {AIContentTypes} from "@/store/chat.ts";

const visible = defineModel();
const emit = defineEmits(['submit']);
const {responseId, contentType} = defineProps<{
  responseId: number
  contentType: AIContentTypes
}>()

const feedbackTextValueRef = ref('')
const feedbackNotTruthfulRef = ref(undefined)
const feedbackNotHelpfulnessRef = ref(undefined)

const submitFeedback = () => {
  const payload: IFeedbackPayload = {
    responseId,
    feedbackOk: false,
    feedbackText: feedbackTextValueRef.value,
  }

  if (feedbackNotHelpfulnessRef.value) {
    payload.feedbackHelpful = false;
  }

  if (feedbackNotTruthfulRef.value) {
    payload.feedbackTruthful = false;
  }

  emit('submit', payload);
}

const category = computed(() => contentType === AIContentTypes.IMAGE ? AIContentTypes.IMAGE : AIContentTypes.TEXT)

</script>

<template>
  <CModal class="feedback-modal" :visible="visible" size="lg" @close="() => { visible = false }">
    <CModalHeader>
      <CIcon icon="cilThumbDown"
             class="feedback-modal__icon me-3"
             size="lg"/>
      <h2>{{ $t(`feedback.${category}.modal.header`) }}</h2>
    </CModalHeader>
    <CForm
        @submit.prevent="submitFeedback">
      <CModalBody
          class="d-flex flex-column"
      >
        <CFormLabel>
          <strong>{{ $t(`feedback.${category}.modal.text.label`) }}</strong>
          <CFormTextarea v-model="feedbackTextValueRef"/>
        </CFormLabel>
        <CFormLabel>
          <CFormCheck v-model="feedbackNotTruthfulRef"/>
          {{ $t(`feedback.${category}.modal.truthy.label`) }}
        </CFormLabel>

        <CFormLabel>
          <CFormCheck v-model="feedbackNotHelpfulnessRef"/>
          {{ $t(`feedback.${category}.modal.helpfulness.label`) }}
        </CFormLabel>
      </CModalBody>

    <CModalFooter class="d-flex justify-content-center">
      <CButton color="primary" type="submit">
        {{ $t(`feedback.${category}.modal.button`) }}
      </CButton>
    </CModalFooter>
    </CForm>
  </CModal>
</template>

<style scoped lang="scss">

.feedback-modal {
  &__icon {
    width: 40px !important;
    height: 40px !important;
    background-color: rgba(254, 226, 226, 1);
    padding: 3px;
    border-radius: 50%;
    color: rgb(220, 38, 38)
  }
}

</style>