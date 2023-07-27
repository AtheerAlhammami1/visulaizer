<template>
  <dialog :id="props.modalId" class="modal">
    <form method="dialog" class="modal-box w-fit ">
      <ul class="steps py-5 mb-3">
        <li class="step" :class="isStepOneComplete">Create Scenario</li>
        <li class="step" :class="isStepTwoComplete">Create Entity</li>
        <li class="step" :class="isStepThreeComplete">Select Points</li>
      </ul>
      <CloseButton/>

      <h3 class="font-bold text-lg mb-2">{{ props.modalTitle }}</h3>
        <slot/>
      <div class="modal-action flex justify-center">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-wide" :onclick="Event" @click="progess++">{{ SubmitText }}</button>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
<script setup>

import CloseButton from "@/components/CloseButton.vue";
import {computed, ref} from "vue";


const props = defineProps({
  modalTitle : String,
  modalId : String,
  SubmitText :String,
  Event :String,
  Progress : Number,
})



let progress = ref(props.Progress);

let isStepOneComplete = computed(() => progress.value >= 1 ? 'step-primary' : '');
let isStepTwoComplete = computed(() => progress.value >= 2 ? 'step-primary' : '');
let isStepThreeComplete = computed(() => progress.value >= 3 ? 'step-primary' : '');
</script>