import { defineStore} from "pinia";
import {ref} from "vue"

export let useMarkersStore = defineStore('markersStore',{
    state(){
        return{
            markers: [],
        }
    },
    actions:{
        insert(latitude, longitude){
        this.markers.push({
            id:this.markers.length + 1,
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
            for(let i = index; i< this.markers.length; i++){
                this.markers[i].id= i + 1;
            }
        }
    }
})