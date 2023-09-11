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
  EntityType: '121100',
  EntityMode: '0',
  EntityStartTime: 0,
  EntityDetectionRange: 0,
  EntitySIDC: ''
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
function addEntity() {
  fillForm()
  modal.value.open = false
  markersList.addEntity(
    formValues.value.EntityName,
    0,
    formValues.value.EntitySIDC,
    markersList.scenarioId,
    formValues.value.EntityMode,
    formValues.value.EntityStartTime,
    formValues.value.EntityDetectionRange
  )
  formValues.value = {
    EntityName: '',
    EntityType: '121100',
    EntityMode: '0',
    EntityStartTime: 0,
    EntityDetectionRange: 0,
    EntitySIDC: ''
  }

  canvasContext.value.clearRect(0, 0, iconCanvas.value.width, iconCanvas.value.height)
}
let loadNotoSymbol = true
natoSymbologyGenerator();// Default for form
function fillForm() {
  formValues.value.EntityName =
    formValues.value.EntityName != '' ? formValues.value.EntityName : 'UnKnown Entity'

  formValues.value.EntityType =
    formValues.value.EntityType != 'Select Entity Type' ? formValues.value.EntityType : '121900'

  if (formValues.value.EntitySIDC == '') {
    loadNotoSymbol = false
    natoSymbologyGenerator()
  }

  formValues.value.EntityMode =
    formValues.value.EntityMode != 'Select Entity Mode' ? formValues.value.EntityMode : 0

  formValues.value.EntityStartTime =
    formValues.value.EntityStartTime != null ? formValues.value.EntityStartTime : 0

  formValues.value.EntityDetectionRange =
    formValues.value.EntityDetectionRange != null ? formValues.value.EntityDetectionRange : 0
}

function natoSymbologyGenerator() {
  let tempSIDC = '300310000012050000000'
  tempSIDC = setNatoClassification(tempSIDC, props.panelName == 'Friend' ? '3' : '6')
  tempSIDC = setNatoType(tempSIDC, formValues.value.EntityType)
  const natoIcon = new milsymbol.Symbol(tempSIDC)
  const svgString = natoIcon.asSVG()
  const canvasImage = new Image()

  if (loadNotoSymbol) {
    canvasImage.onload = () => {
      canvasContext.value.drawImage(
        canvasImage,
        0,
        0,
        iconCanvas.value.width,
        iconCanvas.value.height
      )
    }
  }
  loadNotoSymbol = true
  canvasImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
  formValues.value.EntitySIDC = tempSIDC
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
          placeholder="UnKnown Entity"
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
        <label class="label"> Entity Start Time </label>
        <input
          v-model="formValues.EntityStartTime"
          type="number"
          placeholder="Entity Start Time"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div v-if="panelName != 'Hostile'" class="form-control w-full max-w-xs">
        <label class="label"> Entity Detection Range </label>
        <input
          v-model="formValues.EntityDetectionRange"
          type="number"
          placeholder="Entity Detection Range"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="flex justify-center mt-5">
        <canvas ref="iconCanvas" />
      </div>
      <p class="text-center mt-5" v-if="formValues.EntitySIDC.length != 0">
        Nato SIDC : {{ formValues.EntitySIDC }}
      </p>
      <div class="modal-action flex justify-center">
        <button class="btn btn-wide" @click.prevent="addEntity()">Create Entity</button>
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
