<script setup>
defineProps({
  show: Boolean,
  modalPosition: Object,
  waypoint: Object
})
defineEmits(['hideModal'])
</script>
<template>
  <div
    class="w-1/5 h-1/5 absolute z-10 p-5 border-2 border-base-content opacity-80 bg-base-100"
    :style="{ left: modalPosition.left, top: modalPosition.top }"
    v-show="show"
    id="modal"
    @click="$emit('hideModal', false)"
  >
    <h5>ID: {{ waypoint?.id }}</h5>
    <p>Order: {{ waypoint?.order }}</p>
    <p>Lat: {{ waypoint?.position.lat }}</p>
    <p>Lng: {{ waypoint?.position.lng }}</p>
  </div>
</template>
