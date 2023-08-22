<script setup>
import Calendar from 'primevue/calendar'
import InputText from '@/components/Inputs/InputText.vue'
import DropDown from '@/components/Inputs/DropDown.vue'
import Modal from '@/components/Modal.vue'
import milsymbol from 'milsymbol'
import { inject, onMounted, ref } from 'vue'
import CloseButton from '@/components/Buttons/IconCloseButton.vue'
import { useMarkersStore } from '../stores/useMarkers'

const markersList = useMarkersStore() //to access waypoints array across pages
const axios = inject('axios')

const table_Data = ref([])
onMounted(async () => {
  const scenarios = await axios.get('http://localhost:8080/Scenario/getAll')
  console.error(scenarios.data)
  table_Data.value = scenarios.data
})
const entityType = [
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
const entityClassification = [
  {
    name: 'Pending',
    SIDC: '0'
  },
  {
    name: 'Unknown',
    SIDC: '1'
  },
  {
    name: 'Assumed Friend',
    SIDC: '2'
  },
  {
    name: 'Friend',
    SIDC: '3'
  },
  {
    name: 'Natural',
    SIDC: '4'
  },
  {
    name: 'Subsect/Joker',
    SIDC: '5'
  },
  {
    name: 'Hostile/Faker',
    SIDC: '6'
  }
]
const selectedEntityType = ref('Select Entity Type')
const selectedEntityClassification = ref('Select Classification type')
let natoSIDC = '300310000012110000000'

function setNatoClassification(Num) {
  natoSIDC = natoSIDC.slice(0, 3) + Num + natoSIDC.slice(3 + Num.toString().length)
}
function setNatoType(Num) {
  natoSIDC = natoSIDC.slice(0, 10) + Num + natoSIDC.slice(10 + Num.toString().length)
}
function getSIDC(entityArray, name) {
  const entity = entityArray.find((entity) => entity.name === name)
  return entity ? entity.SIDC : null //change
}

const iconCanvas = ref(null)

function natoSymbologyGenerator() {
  const canvas = iconCanvas.value
  const canvasContext = canvas.getContext('2d')
  canvas.width = 160
  canvas.height = 160

  setNatoClassification(getSIDC(entityClassification, selectedEntityClassification.value))
  setNatoType(getSIDC(entityType, selectedEntityType.value))
  printNatoSymbologyGenerator()
  const natoIcon = new milsymbol.Symbol(natoSIDC)
  const svgString = natoIcon.asSVG()
  const canvasImage = new Image()

  canvasImage.onload = () => {
    canvasContext.drawImage(canvasImage, 0, 0, canvas.width, canvas.height)
  }

  canvasImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
}
function printNatoSymbologyGenerator() {
  console.log(getSIDC(entityType, selectedEntityType.value))
  console.log(getSIDC(entityClassification, selectedEntityClassification.value))
  console.log(natoSIDC)
}
const table_Column = ['Scenario Name', 'Duration', 'Action']

const scenario = ref({
  name: '',
  duration: ''
})

async function createScenario() {
  await axios.post('http://localhost:8080/Scenario/create', scenario.value)
  const scenarios = await axios.get('http://localhost:8080/Scenario/getAll')
  table_Data.value = scenarios.data
}
</script>

<template>
  <!-- Start Scenario Table -->
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th v-for="item in table_Column">{{ item }}</th>
        </tr>
      </thead>
      <!-- head -->
      <tbody>
        <!-- row 1 -->
        <tr v-for="item in table_Data" class="hover">
          <th>{{ item.id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.duration }}</td>
          <td>
            <router-link to="/">
              <button @click="markersList.scenarioId = item.id" class="btn btn-neutral">
                Modify
              </button>
            </router-link>
          </td>
        </tr>
        <!-- row 1 -->
      </tbody>
    </table>
  </div>
  <!-- End Scenario Table -->

  <button class="btn btn-block flex justify-center" onclick="my_modal_1.showModal()">
    Add Scenario
  </button>

  <!-- Start Create Scenario Dialog-->
  <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box p-8 w-fit h-25">
      <CloseButton />
      <h3 class="font-bold text-lg mb-2">Create Scenario</h3>
      <InputText v-model="scenario.name" label="Scenario Name" placeHolder="Enter Scenario name" />
      <InputText
        v-model="scenario.duration"
        value="scenarioDuration"
        label="Scenario Duration"
        placeHolder="Enter Scenario Duration"
      />
      <div class="modal-action flex justify-center">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-wide" @click="createScenario()">Create Scenario</button>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- End Create Scenario Dialog-->
</template>

<style>
.table {
  position: unset;
}
</style>
