<script setup>
import Map from '../components/Map.vue'
import RouteHistory from '../components/TableRouteHistory.vue'
import { onMounted, reactive, ref, inject } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'
import { io } from 'socket.io-client'
let markersList = useMarkersStore() // to access waypoints array across pages
// const socket = io('http://127.0.0.1:3000')
onMounted(() => {
  // listenToUDPServer()
})
/*
 ** Function to act upon recieving udp messages
 */
let tracks = ref([])
function listenToUDPServer() {
  socket.on('udp-message', (message) => {
    tracks.value.push(JSON.parse(message)) // TODO: make data structure to handle multible nested tracks
    trackRecieved(JSON.parse(message))
  })
}

/*
 ** Function to add a new waypoint/marker to the list
 */

function trackRecieved(jsonMessageRecieved) {
  let track = jsonMessageRecieved
  let rowCount = document.getElementById('tableRoutes').rows.length
  markersList.insert(rowCount + 1, track.id, track.latitude, track.longitude)
  center.lat = track.latitude // move map focal point to the new waypoint
  center.lng = track.longitude
  // console.log(jsonMessageRecieved)
}
/*
 ** Function to send From vue to UDP Server
 */
const axios = inject('axios')
function sendToUDPServer() {
  // TODO: implement
  axios
    .post('http://127.0.0.1:3000/send-udp', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => {
      // console.log('resposne: ' + response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <main class="flex justify-center w-full h-full" style="height: calc(100% - 97px)">
    <!-- <RouteHistory class="w-1/2 h-full border-2"></RouteHistory> -->
    <Map class="w-full"></Map>
  </main>
</template>
