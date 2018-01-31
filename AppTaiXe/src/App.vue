<template>
<div>
<!-- <NavBar />  -->

			<!-- <MyMap /> -->
	<div class="container-fluid">
		<div class="row">
		<router-view> </router-view>
		</div>
	</div>

</div>
</template>

<script>
import Vue from 'vue';
import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "localhost:5001");
// import NavBar from './components/NavBar.vue';
// import Categories from './components/Categories.vue';


export default {

  name: 'App',

  data () {
    return {
		socket:  this.$socket,
		add: 'this is address',
		coord : [1,2],
		point: null,
    }
  },
   created (){
    // console.log("created ne");

      this.$socket.on("tradulieu", function(data){
    
      console.log("trả du lieu thành công"+data)});  
  },
  components: {
  //	NavBar, Categories
  }
}
</script>

<style lang="css" scoped>
</style>