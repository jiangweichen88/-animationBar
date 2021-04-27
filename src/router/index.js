import Vue from 'vue'
import Router from 'vue-router'
import bar from '@/components/bar/bar'
Vue.use(Router)
export default new Router({
//	mode: 'history', 
	routes: [{
		path: '/',
		redirect: '/bar', //设置默认指向的路径
		name: '主页',
		component: bar
	},{
		path: '/bar',
		name: 'bar',
		component: bar
	}, ]
})