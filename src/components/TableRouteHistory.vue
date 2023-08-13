<script setup>
import { useMarkersStore } from '../stores/useMarkers'
let markersList = useMarkersStore() // to access waypoints array across pages
</script>
<template>
  <div class="routes my-3 mh-100" style="min-height: 90%">
    <div class="header text-center">
      <h5 class="text-light">Routes History</h5>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 table-responsive table-wrapper-scroll-y my-custom-scrollbar">
          <table
            class="table table-hover table-dark text-center table-striped table-bordered table-responsive overflow-auto mh-100"
            style="max-height: 80%"
            id="tableRoutes"
          >
            <thead class="text-light">
              <th>#</th>
              <th>id</th>
              <th>lat</th>
              <th>long</th>
            </thead>
            <tbody>
              <tr v-for="(route, index) in markersList.selectedEntityWaypoint" :key="index">
                <td>{{ index }}</td>
                <td>{{ route.id }}</td>
                <td>{{ route.position.lat }}</td>
                <td>{{ route.position.lng }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
