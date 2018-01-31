<template>
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">{{title}}</h3>
  </div>
  <div class="panel-body">
    <div class="row" v-if="hasData">
      <Product v-for="p in list" :info="p" :key="p.ProID" />
    </div>
    <div class="row" v-else>
      <div class="col-sm-12 col-md-12">
        Không có sản phẩm thoả điều kiện.
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Product from './Product.vue';

export default {

  name: 'ProductsByCat',

  data () {
    return {
    	title: 'Danh sách sản phẩm',
    	list: []
    }
  },

  computed: {
    hasData () {
      return this.list.length > 0;
    }
  },

  components: {
    Product
  },

  mounted () {
	// console.log(this.$route.params.catId);
	this.fetchProducts(this.$route.params.catId);
  },

  methods: {
    fetchProducts (catId) {
      var self = this;
      var url = `http://localhost:3000/categories/${catId}/products`;
      axios.get(url).then(({data}) => {
        self.list = data;
      }).catch(err => {
        console.log(err);
      });
    }
  },

  watch: {
  	'$route' (to, from) {
  		this.fetchProducts(to.params.catId);
  		// console.log(to.params.catId);
  	}
  },
}
</script>

<style lang="css" scoped>
</style>