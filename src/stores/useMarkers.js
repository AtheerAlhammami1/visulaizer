import { defineStore} from "pinia";
import {ref} from "vue"

export let useMarkersStore = defineStore('markersStore',{
    state(){
        return{
            markers: [],
            id:1
        }
    },
    actions:{
        insert(latitude, longitude){
        this.markers.push({
            id:this.id,
            position: {
            lat: latitude,
            lng: longitude
            }
        })
        this.id = this.id + 1
        },
        updateWaypoint(index, position){
            this.markers[index].position = position;
        },
        removeWaypoint(index){
            this.markers.splice(index,1)
        }
    }
})