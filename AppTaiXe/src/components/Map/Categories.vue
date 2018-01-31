<template>
<div class="panel panel-default">
  <!--   <div class="list-group">
    <a v-for="c in list" href="javascript:;" class="list-group-item" @click="addcc()">{{c.CatName}}</a>
  </div> -->
   <a  href="javascript:;" class="list-group-item" @click="chiDuong()">xxxxx</a>
 <button type="button" v-on:click="show = !show">Click Me! </button>
  <input id="mapSearch" class="controls" type="text" placeholder="Search Box123">
  <!-- pac-input -->
  <transition name="fade">
    <div class="panelConfirm" v-if="show">
      	<form action="#" method="post">
   
          <!-- <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input class="form-control" placeholder="Username" type="text" required/>  
          </div> -->
          
         
          <button class="btn btn-primary btn-block" id ="btnNhanChuyenDi" type="button" @click="nhanKhach()"><i class="glyphicon glyphicon-ok-circle"></i> &nbsp; Nhận chuyến</button>
          <button class="btn btn-success btn-block" id="btnChiDuong" type="button" @click="chiDuong()" ><i class="glyphicon glyphicon-send"></i> &nbsp; Xem đường</button>
          <button class="btn btn-danger btn-block" id="btnTuChoi" type="button" @click="tuChoiKhachHang()" ><i class="glyphicon glyphicon-remove"></i> &nbsp; Từ chối      </button>
          <button class="btn btn-warning btn-block" id ="btnKetThucChuyenDi" type="button" @click="ketThucChuyenXe()" style="visibility: hidden;"><i class="glyphicon glyphicon-ok-circle"></i> &nbsp; Kết thúc</button>


        </form>
    </div>
  </transition>
<div class="google-map" :id="mapName" > 
</div>

</div>
</template>

<script>
// import Vue from 'vue';

import axios from 'axios';
// import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket, "localhost:5001");

export default {
  name: 'google-map',
  props: ['name', 'socket','add', 'point','lat', 'lng','searchFail','changeLocation'],
data: function () {
  return {
    map1: null ,
    flagTuChoi: null,
    currentLocation: {lat: 0, lng:0},
    khach: {lat: 0, lng:0, sdtkh:0},
    show: false,
    yeuCauCu: false,
    mapName: this.name+"map",
    markerCoordinates: [{
      latitude: 10.762677,
      longitude: 106.682569
    }]
  }
},
methods: {
  
  chiDuong() {
    //console.log(this.cu);
    console.log("dang goi c duonh");
   // console.log(this.map1);
    
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map1);
        directionsService.route({
        origin: this.currentLocation ,//{lat: 10.7764, lng: 106.68},
        destination: {lat: this.khach.lat, lng: this.khach.lng},//{lat: 10.8039, lng: 106.636},
        travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  },
  nhanKhach(){
  //  var thongTinChuyenXe = {lat: this.cu};
    var thongTinKhachDiXe =this.khach;
    if(this.yeuCauCu == false){
     this.$socket.emit("batDauChuyenDi", thongTinKhachDiXe); 
    }else{
      this.$socket.emit("batDauChuyenDi2", thongTinKhachDiXe); 
    }
    // this.show=false;
//btnNhanChuyenDi
   // document.getElementById('btnNhanChuyenDi').style.visibility = 'hidden';
    $("#btnNhanChuyenDi").hide();
    $("#btnTuChoi").hide();
    $("#btnChiDuong").hide();
    // document.getElementById('btnTuChoi').style.visibility = 'hidden';
    document.getElementById('btnKetThucChuyenDi').style.visibility = 'visible';

    // hủy bỏ auto 5 giây từ chối khách
    clearInterval(this.flagTuChoi);
  },
  ketThucChuyenXe(){
    // document.getElementById('btnNhanChuyenDi').style.visibility = 'visible';
    // document.getElementById('btnTuChoi').style.visibility = 'visible';
        $("#btnNhanChuyenDi").show();
    $("#btnTuChoi").show();
    $("#btnChiDuong").show();
    document.getElementById('btnKetThucChuyenDi').style.visibility = 'hidden';
   var ttinkh = this.khach;
    this.$socket.emit("ketThucChuyenDi", ttinkh); 
    this.show=false;
  },
   tuChoiKhachHang(){
    $("#btnNhanChuyenDi").show();
    $("#btnTuChoi").hide();
    $("#btnChiDuong").show();
    document.getElementById('btnKetThucChuyenDi').style.visibility = 'hidden';
    this.show=false;
    var ttkh = this.khach;
     this.$socket.emit("tuChoiKhachHang", ttkh); 
  },
  timThayDiem (){

    this.socket.emit("timThayDiaDiem", this.point);  
  },
  
  taiXeGuiToaDo(){
    var xxx = this;
   console.log("dang goi ham gui toa do");
     this.$socket.emit("taiXeGuiToaDo", this.currentLocation);  
     var t = setTimeout(function(){ xxx.taiXeGuiToaDo() }, 5000);
  },
 /* function timedCount() {
    document.getElementById("txt").value = c;
    c = c + 1;
    t = setTimeout(function(){ timedCount() }, 1000);
  },*/
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
  // loadCurrentMap(){
 
  // },
  loadMap(){
     //  var self =this;
  //  self.showAlert();
  // if(this.point != null){
  //     var self =this;
  //  self.showAlert();
  // }
  var self01 =this;
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        //  var pos = 
         var pos ={
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          self01.currentLocation=pos;
          self01.markerCoordinates[0].latitude =pos.lat;
          self01.markerCoordinates[0].longitude =pos.lng;
         // this.currentLocation= pos;
            console.log("kinh  do c urrent "+pos["lat"]);
            self01.changeLocation =pos;
            console.log(self01.currentLocation);
              //taiXeGuiToaDo();

            // map 
  const bounds = new google.maps.LatLngBounds();
  const element = document.getElementById(self01.mapName)
  const searchBox = new google.maps.places.SearchBox(document.getElementById("mapSearch"));

 
  const mapCentre = {latitude:10.7626772, longitude:10.7626772};
  const options = {
  //  zoom: 10,
    center: new google.maps.LatLng(self01.currentLocation.lat, self01.currentLocation.lng),
    //  zoom: bounds.extend(center)
   
  }
  const map = new google.maps.Map(element, options);
  self01.map1 = map;
  
///////////////
  map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

////////////////////

var self= this;
var firstElement = true;
console.log(self01.currentLocation);
  self01.markerCoordinates.forEach((coord) => {
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

            // map end
      });
   }
  
 
/// map cũ ở đây
  }

      /////////
      //  get() {
      //     		this.$socket.emit("get", { id: 12 }, (response) => {
      //               ...
      //           });    
      
},
 created (){
    // console.log((typeof this.point));

      this.$socket.on("tradulieu", function(data){
    
      console.log("trả du lieu thành công"+data)});  
  },
  watch: {
    changeLocation: function(){
       console.log("đổivị tri");
        this.taiXeGuiToaDo();
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
   var ss =this;
   this.loadMap();
//    var cc = setTimeout(function(){
//     alert("Chào mừng bạn đến với freetuts.net");
// }, 5000);
  //  (function(){ss.taiXeGuiToaDo();});
  //setTimeout(do_alert, 3000);
  //if(this.currentLocation.lat !=0){this.taiXeGuiToaDo();}
  
  /////////////////
  const self1 = this;
  this.$socket.on("Server-send-list-xe-ranh", function(listDiem){
           console.log("trả DIEM thành lấy thong tin xe ranh thanh cong");
           console.log(listDiem);
         self1.markerCoordinates[0].latitude =self1.currentLocation.lat;// self1.point.kinhdo;
         self1.markerCoordinates[0].longitude = self1.currentLocation.lng;//self1.point.vido;
    //   self1.markerCoordinates.push({latitude: self1.point.kinhdo,longitude: self1.point.vido});
         listDiem.forEach((xe)=>{
          // console.log(this);
           self1.markerCoordinates.push({latitude: xe.kinhdo,longitude: xe.vido});
           self1.loadMap();
         })
      }); 
      var thisx = this;
    this.$socket.on("yeuCauXe", function(listDiem){
          console.log("thay yeu cau rxxxxxxxxxxxxxxxx");
          thisx.yeuCauCu=false;
          console.log("yeu cau xe nr");
          console.log(listDiem);
          thisx.khach = {lat: listDiem.kinhdo, lng: listDiem.vido, sdtkh: listDiem.sdtkh};
          console.log(thisx.khach);
           thisx.show =!thisx.show;

           // set 5 giây sau nếu k phản ứng gì thì từ chối
           thisx.flagTuChoi = setInterval(function(){ thisx.tuChoiKhachHang() }, 10000);
      });
      
          this.$socket.on("yeuCauXe2", function(listDiem){
            thisx.yeuCauCu=true;
          console.log("thay yeu cau rxxxxxxxxxxxxxxxx");

          console.log("yeu cau xe nr");
          console.log(listDiem);
          thisx.khach = {lat: listDiem.kinhdo, lng: listDiem.vido, sdtkh: listDiem.sdtkh};
          console.log(thisx.khach);
           thisx.show =!thisx.show;

           // set 5 giây sau nếu k phản ứng gì thì từ chối
           thisx.flagTuChoi = setInterval(function(){ thisx.tuChoiKhachHang() }, 10000);
      });


      // this.taiXeGuiToaDo();
    /*
     latitude: 10.7798528,
      longitude: 106.69898650000005
    */

    //Server-send-ket-qua-dang-nhap-app-dinhvi
     	// 	this.$socket.on("Server-send-ket-qua-dang-nhap-app-dinhvi", function(kqDN){
			// 		 console.log("dang nhạp ngon");
					 
      // }); 
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
.panelConfirm{
  position: absolute;
  z-index: 999999;
  width: 200px;
  height: 100;
  /* background-color:  */
 background:rgba(0, 18, 38, 0.3);
  box-shadow:0 1px 3px rgba(0,0,0,.2);
  border-radius:4px;

  bottom: -50px;
  left: 25%;
  /* margin: auto ; */
  padding:20px; margin-top:150px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}


</style>


<style lang="css" scoped>
/* style="height: 2000px" */
/* @media screen and (min-width: 480px) {
    .google-map {
        height: 100%;
    }
} */
</style>