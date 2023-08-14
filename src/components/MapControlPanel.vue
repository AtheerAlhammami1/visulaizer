<script setup>
import EntitySidePanel from './EntitySidePanel.vue'
import { useMarkersStore } from '../stores/useMarkers'
import { inject, markRaw, onMounted } from 'vue'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
onMounted(() => {
  listenToUDPServer()
})

const markersList = useMarkersStore()

function listenToUDPServer() {
  socket.on('udp-message', (message) => {
    if (String(message).charAt(0) == '{') {
      const entity = JSON.parse(message)
      markersList.movingEntity = {
        position: {
          lat: entity.latitude,
          lng: entity.longitude
        }
      }
    } else {
      markersList.movingEntity = null
    }
  })
}

const axios = inject('axios')
async function sendEntity() {
  let entity = {
    name: 'testing',
    sidc: '1003000',
    scenarioId: 1,
    parentId: 1,
    waypoints: []
  }
  for (const waypoint of markersList.selectedEntityWaypoint) {
    entity.waypoints.push({
      latitude: waypoint.position.lat,
      longitude: waypoint.position.lng,
      altitude: 20.0,
      entityRouteId: 5
    })
  }

  axios.post('http://localhost:8080/EntityRoute/simulate', entity)
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
