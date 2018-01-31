import Vue from 'vue';
import VueRouter from 'vue-router';

//
// main component

import App from './App.vue';

//
// router components

// import Index from './components/Index.vue';
import Login from './components/Login.vue';
// import Profile from './components/Profile.vue';
// import ProductsByCat from './components/ProductsByCat.vue';
import MyGGMap from './components/Index.vue';
// import Menu from './components/Categories.vue';
import MyApp from './App.vue';
Vue.use(VueRouter);

const routes = [
	// { path: '/xxxx', component: Index },
	{ path: '/', component: Login },
	{
		path: '/map',
		component: MyGGMap,
		meta: {
			requiresAuth: true
		}
		//components: { default: User, sidebar: Sidebar },socket="socket" :coord="coord" :add="add" :point="point"
		//props: { socket: null, coord: null, add: null, point: null}
	  },
	// { 
	// 	path: '/profile', 
	// 	component: Profile,
	// 	meta: {
	// 		requiresAuth: true
	// 	}
	// },
	// { path: '/categories/:catId', component: ProductsByCat },
	// { path: '/xxx', component: MyApp },
	
];

const router = new VueRouter({
	routes
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});

router.beforeEach((to, from, next) => {
	var r = to.matched.some(record => record.meta.requiresAuth);
	// console.log(r);

	if (r === true) {
		var user = localStorage.auth_user;
		console.log("cc"+user);
		if (!user) {
			next('/');
		}
	}

	next();
});