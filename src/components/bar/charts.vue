<template>
	<div class="h100">
		<div class="h100" ref='bar'></div>
	</div>
</template>

<script>
	export default {
		props: {
			option: {
				series: [],
			},
			_this: {}
		},
		data() {
			return {
				myChart: {}
			}
		},
		computed: {},
		watch: {
			option: {
				handler(newName, oldName) {
					console.log(22)
					this.setOpt();
				},
				deep: true,
//				immediate: true,
			}
		},
		created() {

		},
		mounted() {
			let _this = this;
			window.onresize = function() {
				_this.$emit('windowResize');
				_this.myChart.resize();
			}
		},
		methods: {
			setOpt() {
				let that = this;
				let dom = this.$refs.bar;
				let myChart = this.$echarts.getInstanceByDom(dom);
				if(!myChart) { // 如果不存在，就进行初始化。
					myChart = this.$echarts.init(dom);
				}
				myChart.setOption(this.option,true);
				this.myChart = myChart;
				setTimeout(()=>{
					this.myChart.resize();
				},50)
				myChart.on('click', function(params) {
					console.log(params, that, that._this);
					let {
						name
					} = params;
					let {
						tableData
					} = that._this;
					let row = tableData.find(item => {
						return item.appName == name
					});
					if(row) {
						that._this.goto('dbfx', row.organizer);
					}
				})
			},
		}
	}
</script>

<style>

</style>