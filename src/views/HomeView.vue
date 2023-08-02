<script setup>
import Map from '../components/Map.vue'
import RouteHistory from '../components/TableRouteHistory.vue'
import { onMounted, reactive, ref, inject } from 'vue'
import { useMarkersStore } from '../stores/useMarkers'
import { io } from 'socket.io-client'
let markersList = useMarkersStore() // to access waypoints array across pages
let center = reactive({ lat: 24, lng: 47 }) // center of the map view
const socket = io('http://127.0.0.1:3000')
onMounted(() => {
  listenToUDPServer()
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
  let track=jsonMessageRecieved;
  let rowCount = document.getElementById('tableRoutes').rows.length
  markersList.insert(rowCount + 1, track.id, track.latitude, track.longitude)
  center.lat = track.latitude // move map focal point to the new waypoint
  center.lng = track.longitude
  console.log(jsonMessageRecieved);
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
      console.log('resposne: ' + response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>

  <main class="home container m-auto">
    <div class="history mt-4">
      <div class="history-content mt-5">
        <RouteHistory></RouteHistory>
      </div>
    </div>
    <div class="map-section">
      <Map :center="center" />
    </div>
  </main>
</template>

