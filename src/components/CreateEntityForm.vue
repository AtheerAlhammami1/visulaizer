<script setup>
import CloseButton from '@/components/Buttons/IconCloseButton.vue'
import milsymbol from 'milsymbol'
import { ref } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'

const markersList = useMarkersStore()

const props = defineProps({
  panelName: String
})
const sideNumber = props.panelName == 'Friend' ? '3' : '6'
const formValues = ref({
  EntityName: '',
  EntityType: 'Infantry',
  EntityMode: 'Normal Route',
  EntityStartTime: null,
  EntityDetectionRange: null,
  EntitySIDC: '300' + sideNumber + '10000012110000000'
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
function handleCreateModel(isConfirmed) {
  modal.value.open = false
  if (isConfirmed) {
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
  }
  formValues.value = {
    EntityName: '',
    EntityType: 'Infantry',
    EntityMode: 'Normal Route',
    EntityStartTime: null,
    EntityDetectionRange: null,
    EntitySIDC: '300' + sideNumber + '10000012110000000'
  }
  natoSvg.value = new milsymbol.Symbol(formValues.value.EntitySIDC).asSVG()
}

function fillForm() {
  formValues.value.EntityName =
    formValues.value.EntityName != '' ? formValues.value.EntityName : 'UnKnown Entity'

  formValues.value.EntityMode =
    formValues.value.EntityMode != 'Normal Route' ? formValues.value.EntityMode : 0

  formValues.value.EntityStartTime =
    formValues.value.EntityStartTime != null ? formValues.value.EntityStartTime : 0

  formValues.value.EntityDetectionRange =
    formValues.value.EntityDetectionRange != null ? formValues.value.EntityDetectionRange : 0
}

const natoSvg = ref(new milsymbol.Symbol(formValues.value.EntitySIDC).asSVG())
function natoSymbologyGenerator() {
  let tempSIDC = '300310000012050000000'
  tempSIDC = setNatoClassification(tempSIDC, props.panelName == 'Friend' ? '3' : '6')
  tempSIDC = setNatoType(tempSIDC, formValues.value.EntityType)
  const natoIcon = new milsymbol.Symbol(tempSIDC)
  natoSvg.value = natoIcon.asSVG()
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
      <CloseButton @click.prevent="handleCreateModel(false)" />
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
          <option v-if="formValues.EntityType == 'Infantry'" disabled>Infantry</option>
          <option v-for="entityType in entityTypes" :key="entityType.SIDC" :value="entityType.SIDC">
            {{ entityType.name }}
          </option>
        </select>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label"> Entity Mode </label>
        <select v-model="formValues.EntityMode" class="select select-bordered">
          <option v-if="formValues.EntityMode == 'Normal Route'" disabled>Normal Route</option>
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
          placeholder="0"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div v-if="panelName != 'Hostile'" class="form-control w-full max-w-xs">
        <label class="label"> Entity Detection Range </label>
        <input
          v-model="formValues.EntityDetectionRange"
          type="number"
          placeholder="0"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="flex flex-col items-center justify-center mt-5">
        <div v-html="natoSvg"></div>
        <p class="text-center mt-5" v-if="formValues.EntitySIDC.length != 0">
          Nato SIDC : {{ formValues.EntitySIDC }}
        </p>
      </div>
      <div class="modal-action flex justify-center">
        <button class="btn btn-wide" @click.prevent="handleCreateModel(true)">Create Entity</button>
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
