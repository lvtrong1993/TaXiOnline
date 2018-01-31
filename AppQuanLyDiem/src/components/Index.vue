<template>
<div>
<!-- <NavBar />  -->

			<!-- <MyMap /> -->
	<div class="container-fluid">
		<div class="row">
			
			<div class="col-sm-5 col-md-5">
				<Categories  :coord="coord" :add="add" :chiDuong = "chiDuong" :point="point" @sendCD = "chiDuong = $event" @sendPoint="point = $event"></Categories>
				<!-- v-bind:socket="socket" -->
			</div>
			<div class="col-sm-7 col-md-7">
						<!-- <router-view v-bind:socket="socket" :coord="coord" :add="add" :point="point"> </router-view> -->
						<NavBar
  						v-bind:socket="socket" :coord="coord" :add="add" :point="point" :chiDuong = "chiDuong">
						</NavBar>

			
			</div>
		</div>
	</div>

</div>
</template>

<script>
import Vue from 'vue';
import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "localhost:5001");
import NavBar from './Map/NavBar.vue';
import Categories from './Map/Categories.vue';


export default {

  name: 'App',

  data () {
    return {
		socket:  this.$socket,
		add: 'this is address',
		coord : [1,2],
		point: null,
		chiDuong: null
    }
  },
   created (){
    // console.log("created ne");

      this.$socket.on("tradulieu", function(data){
    
      console.log("trả du lieu thành công"+data)});  
  },
  components: {
  	NavBar, Categories
  }
}
</script>

<style lang="css" scoped>
</style>