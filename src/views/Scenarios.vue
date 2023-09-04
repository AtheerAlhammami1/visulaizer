<script setup>
import InputText from '@/components/Inputs/InputText.vue'
import { inject, onMounted, ref } from 'vue'
import CloseButton from '@/components/Buttons/IconCloseButton.vue'
import { useMarkersStore } from '../stores/useMarkers'

const markersList = useMarkersStore() //to access waypoints array across pages
const axios = inject('axios')

const table_Data = ref([])
onMounted(async () => {
  const scenarios = await axios.get('http://localhost:8080/Scenario/getAll')
  table_Data.value = scenarios.data
})

const table_Column = ['Scenario Name', 'Duration', 'Action']

const scenario = ref({
  name: '',
  duration: ''
})
async function createScenario() {
  if (scenario.value.name?.length > 0 && scenario.value.duration?.length > 0) {
    await axios.post('http://localhost:8080/Scenario/create', scenario.value)
    const scenarios = await axios.get('http://localhost:8080/Scenario/getAll')
    table_Data.value = scenarios.data
  } else {
    alert('Please complete the form')
  }
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
          <th v-for="item in table_Column" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <!-- head -->
      <tbody>
        <!-- row 1 -->
        <tr v-for="item in table_Data" :key="item.id" class="hover">
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
  </dialog>
  <!-- End Create Scenario Dialog-->
</template>

<style>
.table {
  position: unset;
}
</style>
