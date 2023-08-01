<script setup>
import { useMarkersStore } from '../stores/useMarkers'
let markersList = useMarkersStore(); //to access waypoints array across pages
defineProps({
  center: Object
})
</script>
<template>
  <div style="height: 40vw">
    <div id="googleMap">
      <GMapMap :center="center" :zoom="7" map-type-id="terrain">
        <GMapCluster>
          <GMapMarker
            :key="index"
            v-for="(m, index) in markersList.markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
          />
        </GMapCluster>
      </GMapMap>
    </div>
  </div>
</template>
