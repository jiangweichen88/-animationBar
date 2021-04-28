// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
//import echarts from 'echarts';
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts　
import axios from 'axios';　　
Vue.prototype.$http = axios;
import vueResource from 'vue-resource';
Vue.use(vueResource);
import rem from './common/rem.js'
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})