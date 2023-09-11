<script setup>
import { io } from 'socket.io-client'
import { inject, onMounted } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'
import EntitySidePanel from './EntitySidePanel.vue'
const socket = io('http://localhost:3000')
onMounted(() => {
  listenToUDPServer()
})

const markersList = useMarkersStore()

function listenToUDPServer() {
  socket.on('udp-message', (message) => {
    if (message.charAt(0) == '{') {
      const newWaypoint = JSON.parse(message)
      const index = markersList.movingEntity.findIndex(
        (waypoint) => waypoint.entityRouteId == newWaypoint.entityRouteId
      )

      if (index == -1) {
        markersList.movingEntity.push({
          entityRouteId: newWaypoint.entityRouteId,
          SIDC: newWaypoint.sidc,
          position: {
            lat: newWaypoint.latitude,
            lng: newWaypoint.longitude
          }
        })
      } else if (index != -1) {
        markersList.movingEntity[index] = {
          entityRouteId: newWaypoint.entityRouteId,
          SIDC: newWaypoint.sidc,
          position: {
            lat: newWaypoint.latitude,
            lng: newWaypoint.longitude
          }
        }
        const indexReport = markersList.indicatorMarks.findIndex(
          (report) => report.enemyId == newWaypoint.entityRouteId
        )
        if (indexReport != -1) {
          markersList.indicatorMarks[indexReport].position = {
            lat: newWaypoint.latitude + 0.25,
            lng: newWaypoint.longitude + 0.25
          }
        }
      }
    } else {
      markersList.movingEntity = []
      markersList.indicatorMarks = []
    }
  })
  socket.on('udp-incidentReportMessage', (message) => {
    console.log(message)
    if (message.charAt(0) == '{') {
      const newReport = JSON.parse(message)
      const index = markersList.indicatorMarks.findIndex(
        (report) => report.enemyId == newReport.enemyId
      )
      if (index == -1) {
        markersList.indicatorMarks.push({
          enemyId: newReport.enemyId,
          friendlyId: [newReport.friendlyId],
          position: {
            lat: newReport.enemyLatitude + 0.25,
            lng: newReport.enemyLongitude + 0.25
          }
        })
      } else if (index != -1) {
        const tempIndex = markersList.indicatorMarks[index].friendlyId.findIndex(
          (id) => id == newReport.friendlyId
        )
        console.log(tempIndex == -1)
        if (tempIndex == -1) {
          markersList.indicatorMarks[index].friendlyId.push(newReport.friendlyId)
        } else if (tempIndex != -1) {
          markersList.indicatorMarks[index].friendlyId = markersList.indicatorMarks[
            index
          ].friendlyId.filter((id) => id != newReport.friendlyId)
          if (markersList.indicatorMarks[index].friendlyId.length == 0) {
            markersList.indicatorMarks.splice(index, 1)
          }
        }
      }
    }
  })
}

const axios = inject('axios')
async function sendEntity() {
  const entities = [...markersList.friendEntities, ...markersList.hostileEntities]
  const payload = []
  for (const entity of entities) {
    const newWaypoint = []

    for (const waypoint of entity.waypoint) {
      newWaypoint.push({
        latitude: waypoint.position.lat,
        longitude: waypoint.position.lng,
        altitude: 1.0
      })
    }
    payload.push({
      id: entity.id,
      name: entity.name,
      sidc: entity.SIDC,
      scenarioId: entity.scenarioId,
      parentId: entity.parentId,
      mode: entity.mode,
      startTime: entity.startTime,
      detectionRange: entity.detectionRange,
      waypoints: newWaypoint
    })
  }
  axios.post('http://localhost:8088/EntityRoute/simulate', payload)
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
