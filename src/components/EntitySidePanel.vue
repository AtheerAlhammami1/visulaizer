<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'
import CloseButton from '@/components/Buttons/IconCloseButton.vue'
import milsymbol from 'milsymbol'

const prop = defineProps({
  panelName: String,
  icon: String,
  isHostile: 1 | 0
})

const markersList = useMarkersStore()
const showContextMenu = ref(false)

function selectEntity(entityIndex, side) {
  showContextMenu.value = false
  markersList.selectEntity(entityIndex, side)
}

function addEntity(name, parentId, SIDC, scenarioId) {
  modal.value.open = false
  markersList.addEntity(name, parentId, SIDC, scenarioId)
}

function removeEntity(index, panelName) {
  markersList.removeEntity(index, panelName)
  showContextMenu.value = false
}

const contextMenuPosition = ref({ left: 0, top: 0 })
const contextMenuIndex = ref(-1)
function ToggleContextMenu(e, index) {
  showContextMenu.value = true
  contextMenuIndex.value = index
  contextMenuPosition.value.left = e.x + 20 + 'px'
  contextMenuPosition.value.top = e.y + 20 + 'px'
}

const modal = ref()
const iconCanvas = ref()
const canvasContext = ref('')
onMounted(() => {
  iconCanvas.value.width = 160
  iconCanvas.value.height = 160
  canvasContext.value = iconCanvas.value.getContext('2d')
})

const formValues = ref({})
const natoSIDC = ref()
function openModal() {
  formValues.value = { EntityName: '', EntityType: 'Select Entity Type' }
  modal.value.open = true
  canvasContext.value.clearRect(0, 0, iconCanvas.width, iconCanvas.height)
}

const entityTypes = [
  {
    name: 'Aircraft',
    SIDC: '121900'
  },
  {
    name: 'Infantry',
    SIDC: '121100'
  },
  {
    name: 'Tank',
    SIDC: '120500'
  }
]

function setNatoClassification(SIDC, Num) {
  return SIDC.slice(0, 3) + Num + SIDC.slice(3 + Num.length)
}
function setNatoType(SIDC, Num) {
  return SIDC.slice(0, 10) + Num + SIDC.slice(10 + Num.length)
}

function natoSymbologyGenerator() {
  let tempSIDC = '300310000012110000000'
  tempSIDC = setNatoClassification(tempSIDC, prop.panelName == 'Friend' ? '3' : '6')
  tempSIDC = setNatoType(tempSIDC, formValues.value.EntityType)
  const natoIcon = new milsymbol.Symbol(tempSIDC)
  const svgString = natoIcon.asSVG()
  const canvasImage = new Image()

  canvasImage.onload = () => {
    canvasContext.value.drawImage(
      canvasImage,
      0,
      0,
      iconCanvas.value.width,
      iconCanvas.value.height
    )
  }

  canvasImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
  natoSIDC.value = tempSIDC
}
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
        @click="openModal()"
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
  <dialog ref="modal" class="modal">
    <form method="dialog" class="modal-box p-8 w-fit h-25">
      <CloseButton />
      <h3 class="font-bold text-lg mb-2">Create {{ panelName }} Entity</h3>
      <div class="form-control w-full max-w-xs">
        <label class="label"> Entity Name </label>
        <input
          v-model="formValues.EntityName"
          type="text"
          placeholder="Entity Name"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label"> Entity Type </label>
        <select
          v-model="formValues.EntityType"
          class="select select-bordered"
          @change="natoSymbologyGenerator"
        >
          <option disabled>Select Entity Type</option>
          <option v-for="entityType in entityTypes" :key="entityType.SIDC" :value="entityType.SIDC">
            {{ entityType.name }}
          </option>
        </select>
      </div>
      <div class="flex justify-center mt-5">
        <canvas ref="iconCanvas" />
      </div>
      <p class="text-center mt-5" v-if="natoSIDC?.length">Nato SIDC : {{ natoSIDC }}</p>
      <div class="modal-action flex justify-center">
        <button
          class="btn btn-wide"
          @click="addEntity(formValues.EntityName, 0, natoSIDC, markersList.scenarioId)"
        >
          Create Entity
        </button>
      </div>
    </form>
  </dialog>
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
