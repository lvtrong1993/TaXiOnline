<template>
<div class="panel panel-default">
  <!--   <div class="list-group">
    <a v-for="c in list" href="javascript:;" class="list-group-item" @click="addcc()">{{c.CatName}}</a>
  </div> -->
   <a  href="javascript:;" class="list-group-item" @click="addcc()">{{point}}</a>
 <!-- <button type="button" v-on:click="changeData()">Click Me! </button> -->
  <input id="mapSearch" class="controls" type="text" placeholder="Search Box123">
  <!-- pac-input -->
  <div class="google-map" :id="mapName"></div>
</div>
</template>

<script>
// import Vue from 'vue';

import axios from 'axios';
// import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket, "localhost:5001");

export default {
  name: 'google-map',
  props: ['name', 'socket','add', 'point','lat', 'lng','searchFail', 'chiDuong'],
data: function () {
  return {
    map1: null ,
    mapName: this.name+"map",
    markerCoordinates: [{
      latitude: 10.762677,
      longitude: 106.682569
    }]
  }
},
methods: {
  timThayDiem (){

    this.socket.emit("timThayDiaDiem", this.point);  
  },
  changeData(){
    this.markerCoordinates =[{
      latitude: 10.7798528,
      longitude: 106.69898650000005
    }]
    console.log( this.markerCoordinates);
  },
// props:['socket'],
// $xxx = Vue.use(VueWebsocket, "localhost:5001"),
addcc() {
          // Emit the server side
          console.log("Gọi add nà");
          this.socket.emit("addcc", { a: 5, b: 3 });  
          // console ( this.$socket);
          if (typeof this.socket !== 'undefined') {
    // the variable is defined
        console.log ( this.socket.emit("addcc", { a: 5, b: 3 })  );
        }
      },
  showAlert(){
    var cc = this.point['madiem'];
    alert("cc");
  },
    chiDuongFunc(x, k) {
    //console.log(this.cu);
    console.log("dang goi c duonh");
   // console.log(this.map1);
    
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map1);
        directionsService.route({
        origin: x, //this.currentLocation ,//{lat: 10.7764, lng: 106.68},
        destination: k,//{lat: this.khach.lat, lng: this.khach.lng},//{lat: 10.8039, lng: 106.636},
        travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  },
  loadMap(){
     //  var self =this;
  //  self.showAlert();
  // if(this.point != null){
  //     var self =this;
  //  self.showAlert();
  // }
  const bounds = new google.maps.LatLngBounds();
  const element = document.getElementById(this.mapName)
  const searchBox = new google.maps.places.SearchBox(document.getElementById("mapSearch"));

 
  const mapCentre = {latitude:10.7626772, longitude:10.7626772};
  const options = {
   // zoom: 100,
    center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
  }
  const map = new google.maps.Map(element, options);
     this.map1 = map;
  
///////////////
  map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

////////////////////

var self= this;
var firstElement = true;
  this.markerCoordinates.forEach((coord) => {
    const position = new google.maps.LatLng(coord.latitude, coord.longitude);
    if(firstElement== true)
    {
      firstElement =false;
    const marker = new google.maps.Marker({ 
      position,
      map,
      draggable: true,
      // icon: "http://maps.gstatic.com/mapfiles/ms2/micons/cabs.png",
    });
    }else{
      const marker = new google.maps.Marker({ 
      position,
      map,
      draggable: true,
       icon: "http://maps.gstatic.com/mapfiles/ms2/micons/cabs.png",
    });
    }
    map.fitBounds(bounds.extend(position))
  }); 
 
  ///////////////////
   var markers = [];
      searchBox.addListener('places_changed', function() {
        this.markerCoordinates=[];
       //  infowindow.open(map, markers);
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            alert("Không tìm thấy địa điểm");
            if(self.searchFail==true)
            {
              self.searchFail=false
            }else{
              self.searchFail=true;
            //  this.markerCoordinates =[];
            }
            return;
          }
         
          // alert( this.point);
          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            self.lat= place.geometry.location.lat();
            self.lng= place.geometry.location.lng();
         //  this.markerCoordinates[0] = {   latitude:  self.lat, longitude:  self.lng};
            console.log(self.lng);
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              // icon: icon,
             icon: "http://maps.gstatic.com/mapfiles/ms2/micons/cabs.png",
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
  }

      /////////
      //  get() {
      //     		this.$socket.emit("get", { id: 12 }, (response) => {
      //               ...
      //           });    
      
},
 created (){
  //  console.log("this is a message from created hook!");
    // console.log((typeof this.point));

      this.$socket.on("tradulieu", function(data){
    
      console.log("trả du lieu thành công"+data)});  
  },
  watch: {
        chiDuong : function(){
          console.log("gui chi dung ok");
          console.log(this.chiDuong);
          var xe01 = {lat:this.chiDuong[0].lat, lng: this.chiDuong[0].lng};
          this.chiDuongFunc(this.chiDuong[0], this.chiDuong[1]);
        },
        searchFail: function(){
          console.log("searchFail thay đổi");
          // gửi thông báo ko tìm thấy địa điểm lên server 
        },
        lat : function () {
            this.point['kinhdo'] =this.lat;
        }, 
        lng : function () {
            this.point['vido'] =this.lng;
            // GỌI HÀM ĐẨ DỮ LIỆU VỀ SERVER
            this.timThayDiem();

        }, 
        point : function () {
            alert(this.point['madiem']);

            var TheTextBox = document.getElementById("mapSearch");
        //    TheTextBox.value = "";TheTextBox.value + 
            TheTextBox.value = this.point['vitritruocdinhvi'];
          //  this.markerCoordinates[0].latitude =this.point['kinhdo'];
            //this.markerCoordinates[0].longitude =this.point['vido'];
        }
  },
 mounted: function () {
   this.loadMap();
  /////////////////
  const self1 = this;
  //self1.markerCoordinates=[];
  this.$socket.on("Server-send-list-xe-ranh", function(listDiem){
           console.log("trả DIEM thành lấy thong tin xe ranh thanh cong");
           console.log(listDiem);
           self1.markerCoordinates=[];
           self1.markerCoordinates.push({latitude: self1.point.kinhdo,longitude: self1.point.vido});
         self1.markerCoordinates[0].latitude = self1.point.kinhdo;
         self1.markerCoordinates[0].longitude = self1.point.vido;
    //   self1.markerCoordinates.push({latitude: self1.point.kinhdo,longitude: self1.point.vido});
         listDiem.forEach((xe)=>{
          // console.log(this);
           self1.markerCoordinates.push({latitude: xe.kinhdo,longitude: xe.vido});
           self1.loadMap();
         })
      }); 
    /*
     latitude: 10.7798528,
      longitude: 106.69898650000005
    */
}
  
};
</script>

<style scoped>
.google-map {
  position: relative;
  width: 100%;
  height: 650px;
  margin: 0 auto;
  background: gray;
}
</style>


<style lang="css" scoped>
</style>