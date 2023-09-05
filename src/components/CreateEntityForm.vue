<script setup>
import CloseButton from '@/components/Buttons/IconCloseButton.vue'
import milsymbol from 'milsymbol'
import { onMounted, ref } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'

const markersList = useMarkersStore()

const props = defineProps({
  panelName: String
})
const formValues = ref({
  EntityName: '',
  EntityType: 'Select Entity Type',
  EntityMode: 'Select Entity Mode',
  EntityStartTime: null
})
const iconCanvas = ref()
const canvasContext = ref('')
onMounted(() => {
  iconCanvas.value.width = 160
  iconCanvas.value.height = 80
  canvasContext.value = iconCanvas.value.getContext('2d')
})
const entityModes = [
  {
    name: 'Normal Route',
    value: 0
  },
  {
    name: 'Patrol',
    value: 1
  }
]

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
const natoSIDC = ref()
function addEntity(name, parentId, SIDC, scenarioId, entityMode, startTime) {
  if (
    formValues.value.EntityName != '' &&
    formValues.value.EntityType != 'Select Entity Type' &&
    formValues.value.EntityMode != 'Select Entity Mode' &&
    formValues.value.EntityName != -1
  ) {
    modal.value.open = false
    markersList.addEntity(name, parentId, SIDC, scenarioId, entityMode, startTime)
    formValues.value = {
      EntityName: '',
      EntityType: 'Select Entity Type',
      EntityMode: 'Select Entity Mode',
      EntityStartTime: null
    }
    natoSIDC.value = ''
    canvasContext.value.clearRect(0, 0, iconCanvas.value.width, iconCanvas.value.height)
  } else {
    modal.value.open = true
    alert('Please complete the form')
  }
}

function natoSymbologyGenerator() {
  let tempSIDC = '300310000012110000000'
  tempSIDC = setNatoClassification(tempSIDC, props.panelName == 'Friend' ? '3' : '6')
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

function setNatoClassification(SIDC, Num) {
  return SIDC.slice(0, 3) + Num + SIDC.slice(3 + Num.length)
}
function setNatoType(SIDC, Num) {
  return SIDC.slice(0, 10) + Num + SIDC.slice(10 + Num.length)
}
const modal = ref()
</script>

<template>
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
      <div class="form-control w-full max-w-xs">
        <label class="label"> Entity Mode </label>
        <select v-model="formValues.EntityMode" class="select select-bordered">
          <option disabled>Select Entity Mode</option>
          <option
            v-for="entityMode in entityModes"
            :key="entityMode.value"
            :value="entityMode.value"
          >
            {{ entityMode.name }}
          </option>
        </select>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label"> Entity Start time </label>
        <input
          v-model="formValues.EntityStartTime"
          type="number"
          placeholder="Entity Start time"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="flex justify-center mt-5">
        <canvas ref="iconCanvas" />
      </div>
      <p class="text-center mt-5" v-if="natoSIDC?.length">Nato SIDC : {{ natoSIDC }}</p>
      <div class="modal-action flex justify-center">
        <button
          class="btn btn-wide"
          @click.prevent="
            addEntity(
              formValues.EntityName,
              0,
              natoSIDC,
              markersList.scenarioId,
              formValues.EntityMode,
              formValues.EntityStartTime
            )
          "
        >
          Create Entity
        </button>
      </div>
    </form>
  </dialog>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
