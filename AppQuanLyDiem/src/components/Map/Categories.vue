<template>
<div class="panel panel-default">
  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">THÔNG TIN TÀI XẾ</h4>
        </div>
        <div class="modal-body">
          <table class="table">
            <tbody>
              <tr>
                <td>Mã tài xế:</td>
                <td >{{taixe.manv}}</td>
              </tr>  
              <tr>
                <td>Tên tài xế:</td>
                <td >{{taixe.tennv}}</td>
              </tr> 
              <tr>
                <td>Số điện thoại:</td>
                <td >{{taixe.sdt}}</td>
              </tr> 
              <tr>
                <td>Địa chỉ:</td>
                <td>{{taixe.diachi}}</td>
              </tr> 
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  <!-- modal end -->
  <div class="panel-heading">
    <!-- <h3 class="panel-title">{{coord.length}} + {{add}}</h3> -->
  </div>
  <!-- <div class="list-group">
    <router-link class="list-group-item" v-for="c in list" :to="'/categories/' + c.CatID">
      {{c.CatName}}
    </router-link>
  </div> -->
   <!-- <a  href="javascript:;" class="list-group-item" data-toggle="modal" data-target="#myModal">xxx Me Baby!</a> -->
 <!-- <a  href="javascript:;" class="list-group-item" @click="testlaydinhvi()">Click Me Baby!</a> -->

  <table  class=" table table-bordered">
            <thead>
              <tr >
                <th>ID</th>
                <th>Vị trí</th>
                <th>Tình trạng</th>
                <th>Tài xế</th>
                <th>Chỉ đường</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in list">
                <td >
                  {{c.madiem}}
                </td>
                 <td >
                  {{c.vitritruocdinhvi}}
                </td>
                 <td v-if="c.tinhtrang == '0'">
                  Chưa định vị
                </td>
                <td v-if="c.tinhtrang == '1'">
                  Đã định vị
                </td>
                <td v-if="c.tinhtrang == '3'">
                  Đang trong chuyến
                </td>
                <td v-if="c.tinhtrang == '4'">
                  Đã kết thúc
                </td>
                <td>
                   <a  href="javascript:;" class="list-group-item"  @click="getInforTXById(c.mataixe)" data-toggle="modal" data-target="#myModal" >
                     <span class="glyphicon glyphicon-info-sign"></span>
                   </a>
                  
                </td>
                <td v-if="c.tinhtrang == '3'">
                   <a  href="javascript:;" class="list-group-item" @click="chiDuong(c.kinhdo, c.vido, c.mataixe)"  >
                     <span class="glyphicon glyphicon-map-marker"></span>
                   </a>
                  
                </td>
                 <!-- <td><button @click="getPointByClickTable(c)">X</button></td> -->
              </tr>
            </tbody>
          </table>
</div>
</template>

<script>
import axios from 'axios';

export default {
  props: [ 'socket', 'coord','add','point'],
  name: 'Categories',

  data () {
    return {
      list: [],
      taixe: {}
    }
  },
methods: {
// props:['socket'],
// $xxx = Vue.use(VueWebsocket, "localhost:5001"),
addcc() {
  
          // Emit the server side
          console.log("Gọi add nà baby");
          this.socket.emit("addcc", { a: 5, b: 3 });  
          // console ( this.$socket);
          if (typeof this.socket !== 'undefined') {
    // the variable is defined
        console.log ( this.socket.emit("addcc", { a: 5, b: 3 })  );
        }
      },
  getInforTXById(idTX) {
        console.log("danyeu cau lau user name tai xe "+idTX);
         this.$socket.emit("getInforTXById", idTX);  
         //listDiemChuaDinhVi
      },  
      chiDuong(kd, vd ,tx){
        var ss = this;
        console.log("dang goi chi duong");
        this.getInforTXById(tx);
        var k = {lat: kd, lng: vd};
        var xe = {lat: ss.taixe.lat, lng: ss.taixe.lng};
        console.log("xe ne");
        console.log(this.xe);
        ss.chiDuong = [k, xe];
        this.$emit('sendCD', ss.chiDuong)
       // this.chiDuongKhachTX(xe, k); 
      //  console.log
      },
        chiDuongKhachTX(tx, khach) {
    //console.log(this.cu);
    console.log("dang goi c duonh");
   // console.log(this.map1);
    
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map1);
        directionsService.route({
        origin: tx ,//{lat: 10.7764, lng: 106.68},
        destination: khach,// {lat: this.khach.lat, lng: this.khach.lng},//{lat: 10.8039, lng: 106.636},
        travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  },
  testlaydinhvi() {
        console.log("dang yeu cau lay full diem");
         this.$socket.emit("fullListDiem", { a: 5, b: 3 });  
         //listDiemChuaDinhVi
      },
  removeUser (id) {
      alert('You are deleting user id: ' + id)
      // axios.delete('https://your.rest.api/users/' + id)
    },
  getPointByClickTable(p){
    this.point =p;
    this.$emit('sendPoint', this.point)
    console.log(this.point);
  },

  tronglv(){
    this.$socket.emit("test1", { a: 5, b: 3 });  
    console.log("goi trong lv function ne");
  }
},
created (){
    console.log("created ne");
    var self = this;
    self.testlaydinhvi();
      // this.$socket.on("tradulieu", function(data){
    
      //  console.log("trả du lieu thành công1"+data)});


      // this.$socket.emit("listDiemChuaDinhVi", { a: 5, b: 3 });  
      // this.$socket.on("Server-send-list-diem-chua-dinh-vi", function(listDiem){
      //      console.log("trả DIEM thành công1123414");
      //      console.log(listDiem);
      //     self.list = listDiem;
           
      // }); 
      
  },
  mounted () {
    var self = this;
    // var url = 'http://localhost:3000/categories';
    // axios.get(url).then(res => {
    //   self.list = res.data;
    // }).catch(err => {
    //   console.log(err);
    // });
//
         this.$socket.on("Server-send-driver-infor", function(datatx){
        //    console.log("nghe dc test 2");
        //  console.log(datatx);
         self.taixe = datatx;
         console.log(self.taixe);
         });

         this.$socket.on("test2", function(data){
           console.log("nghe dc test 2");
     //  alert(data);
         });
    // this.$socket.emit("listDiemChuaDinhVi", { a: 5, b: 3 });  
      this.$socket.on("Server-send-full-list", function(listDiem){
           console.log("trả DIEM thành công112341411111");
           console.log(listDiem.length);
          self.list = listDiem;
       //   console.log( self.list);
             //console.log(self.$coord);
      }); 
        this.$socket.on("Server-send-list-diem-chua-dinh-vi1", function(dt){
          // console.log("trả DIEM thành công112341411111");
          // console.log(listDiem.length);
         // self.list = listDiem;
             console.log(dt);
      }); 

   
  },
  computed: {
      getPointByClickTable2 (p){
        //return this.message.split('').reverse().join('')
    this.point =100;
    this.$emit('sendPoint', this.point)
    console.log(this.point);
     }
  }
  
}
</script>

<style lang="css" scoped>
</style>