<template>
  <dialog :id="props.modalId" class="modal">
    <form method="dialog" class="modal-box w-fit">
      <ProgressBar :progess="prges"/>
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

import ProgressBar from "@/components/ProgressBar.vue";
import CloseButton from "@/components/CloseButton.vue";


const props = defineProps({
  modalTitle : String,
  modalId : String,
  SubmitText :String,
  Event :String
})

</script>