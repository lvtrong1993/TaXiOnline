<template>
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">{{coord.length}} + {{add}}</h3>
  </div>
  <!-- <div class="list-group">
    <router-link class="list-group-item" v-for="c in list" :to="'/categories/' + c.CatID">
      {{c.CatName}}
    </router-link>
  </div> -->
   <a  href="javascript:;" class="list-group-item" @click="tronglv()">xxx Me Baby!</a>
 <a  href="javascript:;" class="list-group-item" @click="testlaydinhvi()">Click Me Baby!</a>

  <table  class=" table table-bordered">
            <thead>
              <tr >
                <th>ID</th>
                <th>Vị trí</th>
                <!-- <th>Điểm</th>
                <th>Xác định</th> -->
                
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
                 <td><button @click="getPointByClickTable(c)">X</button></td>
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
      list: []
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

      /////////
      //  get() {
      //     		this.$socket.emit("get", { id: 12 }, (response) => {
      //               ...
      //           });    
  testlaydinhvi() {
    console.log("dang goi ham test lay dvi");
         this.$socket.emit("listDiemChuaDinhVi", { a: 5, b: 3 });  
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


         this.$socket.on("test2", function(data){
           console.log("nghe dc test 2");
     //  alert(data);
         });
    // this.$socket.emit("listDiemChuaDinhVi", { a: 5, b: 3 });  
      this.$socket.on("Server-send-list-diem-chua-dinh-vi", function(listDiem){
           console.log("trả DIEM thành công112341411111");
           console.log(listDiem.length);
          self.list = listDiem;
             console.log(self.$coord);
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