<script setup>
import EntitySidePanel from './EntitySidePanel.vue'
import { useMarkersStore } from '../stores/useMarkers'
import { inject, onMounted } from 'vue'
import { io } from 'socket.io-client'
const socket = io('http://127.0.0.1:3000')
onMounted(() => {
  listenToUDPServer()
})
/*
 ** Function to act upon recieving udp messages
 */

function listenToUDPServer() {
  socket.on('udp-message', (message) => {
    console.error(message)
  })
}

const markersList = useMarkersStore()
const axios = inject('axios')
async function sendEntity() {
  let entity =
    markersList.entitySide == 'Friend'
      ? JSON.stringify(markersList.friendEntities[markersList.selectedEntityIndex])
      : JSON.stringify(markersList.hostileEntities[markersList.selectedEntityIndex])

  entity = {
    name: 'testing',
    sidc: '1003000',
    scenarioId: 1,
    parentId: 1,
    waypoints: [
      {
        latitude: 20,
        longitude: 23,
        altitude: 20.0,
        entityRouteId: 5
      },
      {
        latitude: 20.5,
        longitude: 24.5,
        altitude: 20.0,
        entityRouteId: 5
      },
      {
        latitude: 22,
        longitude: 25,
        altitude: 20.0,
        entityRouteId: 5
      },
      {
        latitude: 23,
        longitude: 26,
        altitude: 20.0,
        entityRouteId: 5
      },
      {
        latitude: 24,
        longitude: 27,
        altitude: 20.0,
        entityRouteId: 5
      }
    ]
  }

  // const response = await axios.get('http://localhost:8080/EntityRoute/simulate', entity)
  // const response = await axios.get('http://localhost:8080/EntityRoute/getAllByScenarioId/1')
  const response = axios.post('http://localhost:8080/EntityRoute/simulate', entity)
  console.error(response)
}
</script>
<template>
  <div class="w-1/5 min-w-fit h-1/2 absolute z-10 bg-base-100 select-none">
    <EntitySidePanel panelName="Friend" isHostile="0" icon="src/assets/images/FriendEntity.svg" />
    <EntitySidePanel panelName="Hostile" isHostile="1" icon="src/assets/images/HostileEntity.svg" />
    <button
      class="bg-base-100 w-full h-10 border-2 border-t-0 border-base-content cursor-pointer start-scenario"
      @click="sendEntity"
    >
      Start Scenario
    </button>
  </div>
</template>
<style>
.start-scenario:hover {
  background-color: #5151c5;
}
</style>
