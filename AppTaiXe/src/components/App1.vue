<template>
<div>
<!-- <NavBar />  -->

			<!-- <MyMap /> -->
	<div class="container-fluid">
		<div class="row">
			<div  id="xxx">
			<!-- <div class="col-sm-3 col-md-3"> -->
				<Categories  :coord="coord" :add="add" :point="point" @sendPoint="point = $event"></Categories>
				</div>
				<!-- v-bind:socket="socket" -->
			<!-- </div> -->
		<!-- <div class="col-sm-9 col-md-9"> -->
						<!-- <router-view v-bind:socket="socket" :coord="coord" :add="add" :point="point"> </router-view> -->
						<!-- <NavBar
  						v-bind:socket="socket" :coord="coord" :add="add" :point="point">
						</NavBar> -->

			
			<!-- </div> --> 
		</div>
	</div>

</div>
</template>

<script>
import Vue from 'vue';
import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "localhost:5001");
import NavBar from '../components/Map/NavBar.vue';
import Categories from '../components/Map/Categories.vue';


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
  	NavBar, Categories
  }
}
</script>

<style lang="css" scoped>
@media screen and (min-width: 700px) {
    #xxx {
        height: 0 !important;
    }
}
</style>