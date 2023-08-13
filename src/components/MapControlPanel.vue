<script setup>
import EntitySidePanel from './EntitySidePanel.vue'
</script>
<template>
  <div class="w-1/5 min-w-fit h-1/2 absolute z-10 bg-base-100 select-none">
    <EntitySidePanel panelName="Friend" isHostile="0" icon="src/assets/images/FriendEntity.svg" />
    <EntitySidePanel panelName="Hostile" isHostile="1" icon="src/assets/images/HostileEntity.svg" />
  </div>
</template>
