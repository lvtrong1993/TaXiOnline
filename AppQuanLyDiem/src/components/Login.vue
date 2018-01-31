<template>
<div >
<div class="panel panel-default" >
	<div id="contentPanel" style="height: 700px;">
	<div class="panel-heading">
		<h1 class="panel-title">{{title}}</h1>
	</div>
	<!-- <div class="panel-body">
		<div class="row">
			<div class="col-sm-6 col-md-6">
				<form>
					<div class="form-group">
						<label for="txtUsername">Username</label>
						<input type="text" class="form-control" id="txtUsername" v-model="username">
					</div>
					<div class="form-group">
						<label for="txtPWD">Password</label>
						<input type="password" class="form-control" id="txtPWD" v-model="password">
					</div>
					<button type="button" class="btn btn-primary btn-block" @click="login">
						<span class="glyphicon glyphicon-user"></span>
						Đăng nhập
					</button>
				</form>
			</div>
		</div>
	</div> -->
		<div class="col-md-4 col-md-offset-4 login-form text-center" id="">
	<p class="logo-b">Taxi</p>
	<form action="#" method="post">
   
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
    <input class="form-control" placeholder="Username" type="text" id="txtUsername" v-model="username" required/>  
    </div>
    
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
    <input type="password" class="form-control" placeholder="Password" id="txtPWD" v-model="password" required/>
    </div>
    
    <button class="btn btn-danger btn-block" type="button" @click="testLGDV" ><i class="glyphicon glyphicon-send"></i> &nbsp; Login</button>
    </form>
	</div>
	</div>
</div>
</div>
</template>

<script>
import Vue from 'vue';
import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "localhost:5001");
export default {

  name: 'Login',

  data () {
    return {
    	title: 'Đăng nhập',
    	username: '',
    	password: ''
    }
  },

  methods: {
		testLGDV() {
			// console.log("dang goi dnhap");this.$socket.emit("test1", { a: 5, b: 3 });  
			var data ={username: this.username, password: this.password};
			this.$socket.emit('testLoginDV', data);
			console.log(data);
		},
		   login123 () {
		//	if (this.username === 'nndkhoa' && this.password === '123')
			// if(true) 
			{
      	localStorage.auth_user = this.username;
      	this.$router.push('/map');
			} 
			/*else {
      	alert('Login failed');
			}*/
    },
    login1 () {
			// kiểm tra đang nhập
      
      	localStorage.auth_user = this.username;
      	this.$router.push('/map');
      
    }
	},
	
	mounted () {
	var	self=this;
		this.$socket.on("Server-send-ket-qua-dang-nhap-app-dinhvi", function(kqDN){
					 console.log(kqDN);
					 if(kqDN>0){
							 self.login123();
							 //self.localStorage.clear();
							//  alert('Đăng nhập ok');
					 }else{
						 alert('Đăng nhập thất bại');
					 }
      }); 
	}
}
</script>

<style lang="css" scoped>
@font-face {
font-family: 'Montserrat';
font-style: normal;
font-weight: 300;
src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v10/IVeH6A3MiFyaSEiudUMXE8u2Q0OS-KeTAWjgkS85mDg.woff2) format('woff2');
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;}
#contentPanel,html{height:100%; width:100%}
#contentPanel{background:url("http://2.pik.vn/201878881e4b-9f06-4bef-b536-70dfaf25461b.jpg"); background-position:center; background-size:cover; font-family:'Montserrat',sans-serif; height:100%}
.login-form{background:rgba(255, 255, 255, 0.25); padding-bottom:20px; margin-top:150px; box-shadow:0 1px 3px rgba(0,0,0,.2); border-radius:4px}
.input-group-addon{background:#4e4a59; border:none; color:#fff}
.form-control{border:none; color:#fff; outline:none !important; box-shadow:none !important; background:#4e4a59}
.input-group{margin-bottom:15px}
.btn{border:none; padding:8px; outline:none !important; box-shadow:none !important}
.logo-b{height:80px; width:80px; border:solid 5px #d9534f; margin:15px 0; font-weight:600;padding:0; display:inline-block; color:#d9534f; font-size:30px; line-height:70px; border-radius:50%}
	
	@media(max-width:900px){
		.login-form{margin-top:50px}
	}
</style>