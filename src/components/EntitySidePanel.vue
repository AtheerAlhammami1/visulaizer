<script setup>
import { ref } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'
import CreateEntityForm from '@/components/CreateEntityForm.vue'

defineProps({
  panelName: String,
  icon: String,
  isHostile: 1 | 0
})

const markersList = useMarkersStore()
const showContextMenu = ref(false)

const contextMenuPosition = ref({ left: 0, top: 0 })
const contextMenuIndex = ref(-1)
function ToggleContextMenu(e, index) {
  showContextMenu.value = true
  contextMenuIndex.value = index
  contextMenuPosition.value.left = e.x + 20 + 'px'
  contextMenuPosition.value.top = e.y + 20 + 'px'
}

function selectEntity(entityIndex, side) {
  showContextMenu.value = false
  markersList.selectEntity(entityIndex, side)
}

function removeEntity(index, panelName) {
  markersList.removeEntity(index, panelName)
  showContextMenu.value = false
}

const createForm = ref()
</script>
<template>
  <div
    class="h-1/2 border-b-2 border-r-2 border-base-content overflow-y-auto overflow-x-hidden scroll-container"
    @scroll="showContextMenu = false"
  >
    <div
      class="w-full h-1/2 absolute"
      @click="showContextMenu = false"
      @click.right.prevent="showContextMenu = false"
    ></div>
    <div
      class="flex justify-between border-b border-base-content p-2 mb-4 sticky top-0 bg-base-100 z-10"
      @click="showContextMenu = false"
      @click.right.prevent="showContextMenu = false"
    >
      {{ panelName }} Entity
      <font-awesome-icon
        class="px-1 pt-1 text-xl cursor-pointer transform hover:scale-125 transition-transform duration-1000 ease-in-out"
        :icon="['fas', 'plus']"
        @click="createForm.$refs.modal.open = true"
      />
    </div>
    <div class="flex flex-col items-center mx-12 relative">
      <div
        v-show="showContextMenu"
        class="w-40 fixed bg-base-100 border-2 border-base-content p-4 z-50"
        :style="{ left: contextMenuPosition.left, top: contextMenuPosition.top }"
        @click="showContextMenu = false"
        @click.right.prevent="showContextMenu = false"
      >
        <div class="hover:bg-blue-300" @click="removeEntity(contextMenuIndex, panelName)">
          Delete Entity
        </div>
      </div>
      <div
        :class="{
          selectedEntity:
            markersList.selectedEntityIndex == index && markersList.entitySide == panelName
        }"
        class="p-2 mb-2 w-full border-b-2 border-base-content flex justify-between items-center cursor-pointer hover:scale-110 transition-transform duration-1000 ease-in-out"
        @click="selectEntity(index, panelName)"
        @click.right.prevent="ToggleContextMenu($event, index)"
        v-for="(entity, index) in isHostile == 0
          ? markersList.friendEntities
          : markersList.hostileEntities"
        :key="entity"
      >
        <img :src="'src/assets/images/' + entity.SIDC + '.svg'" />
        {{ entity.name }}
        <font-awesome-icon
          @click.right="ToggleContextMenu($event)"
          class="text-xl cursor-pointer transform hover:scale-125 transition-transform duration-1000 ease-in-out"
          :icon="['fas', 'angle-down']"
        />
      </div>
    </div>
  </div>
  <CreateEntityForm ref="createForm" :panelName="panelName" />
</template>
<style>
.selectedEntity {
  background-color: #5151c5;
}

.scroll-container::-webkit-scrollbar {
  width: 12px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #8a8d8a;
  border-radius: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background-color: #8a8d8a49;
  border-radius: 6px;
}
</style>
