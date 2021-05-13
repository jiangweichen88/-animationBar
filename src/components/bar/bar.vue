<template>
	<div class="bg" style="width: 38.40rem;height: 13.52rem">
		<img src="@/assets/bg.png" />
		<div class="jc-echarts">
			<bar0 :option="option" @windowResize="windowResize" :_this='this'></bar0>
			<!--<bar0 :option="optionBar1Data"  @windowResize="windowResize" :_this='this'></bar0>-->
		</div>
	</div>
</template>
<script>
	import bar0 from './charts.vue';
	import { GDP0, electricity0 } from '@/assets/data/data.js';
	import { optionBar1 } from './charts.js';
	import { numberToChinese, thousands, getCN, countryArr, keyToValue, nest, remTpx } from '@/common/common.js';
	export default {
		name: '',
		components: {
			bar0
		},
		props: {},
		data() {
			return {
				option: {},
				barData: {},
				electricityArr: [],
				optionW: {
					barWidth: remTpx(3840, 0.42),
					iconWidth: remTpx(3840, 0.48),
				},
				optionBar1Data: {}
			}
		},
		computed: {},
		watch: {},
		created() {
			let _this = this;
			console.log(GDP0, electricity0);
			if(electricity0) {
				let data = electricity0,
					data0 = data[0],
					data2 = data[2];
				let arr = [];
				data0.map((item, index) => {
					if(index > 0) {
						arr.push({
							name: item.slice(0, -1),
							value: data2[index]
						})
					}
				})
				this.electricityArr = arr;

			}
			let data = GDP0,
				data0 = data[0];
			data0.push(null);
			let barData = {
				years: [],
				data: [],
				chinaData: []
			};
			data0.map((item, index) => {
				if(index % 2 == 0 && index > 0) {
					let year = data0[index - 1].slice(0, -1);
					data0[index] = year;
					barData.years.push(year);
					let obj = {
						name: year,
						value: []
					};
					data.map((item2, index2) => {
						if(index2 > 1 && item2.length) {
							let num = 0,
								wy = item2[index],
								c = item2[index - 1];
							if(c == '中国') {
								barData.chinaData.push(wy);
							}
							obj.value.push([wy, c, wy]) //数字、国家、万亿
						}
					})
					barData.data.push(obj)
				}
			});
			console.log(barData);
			this.barData = barData;
			this.getOption(this.barData);
		},
		mounted() {
			let _this = this;
			this.optionBar1Data = optionBar1();
			console.log(this.optionBar1Data)
		},
		destroyed() {},
		methods: {
			windowResize() {
				this.option.series[0].barWidth = remTpx(3840, 0.42);
				this.optionW.iconWidth = remTpx(3840, 0.48, 10);
				this.optionW.fontWidth = remTpx(3840, 24, 10);
			},
			getOption(dataAll) {
				//	return 
				let echarts = this.$echarts;
				console.log(dataAll);
				let data = dataAll.data.reverse(),
					years = dataAll.years.reverse(),
					startIndex = 0,
					startYear = years[startIndex];
				let chinaData = dataAll.chinaData.reverse().map(item => {
					let wy = String(item);
					if(wy) {
						if(wy.indexOf('万亿') > -1) {
							wy = parseFloat(wy) * 10000;
						} else {
							wy = parseFloat(wy);
						}
					}
					return wy
				});
				let _this = this,
					updateFrequency = 2000,
					dimension = 0;
				let electricityArr = years.map(item => {
					return this.electricityArr.find(item2 => {
						return item2.name == item
					}).value || 0;
				})
				electricityArr[electricityArr.length - 1] = electricityArr[electricityArr.length - 2];
				console.log(electricityArr)
				data.map(item => {
					item.value.map(item2 => {
						let wy = String(item2[0]);
						if(wy) {
							if(wy.indexOf('万亿') > -1) {
								item2[0] = parseFloat(wy) * 10000;
							} else {
								item2[0] = parseFloat(wy);
							}
						}

					})
				})
				console.log(data, chinaData)
				let objC = {};
				countryArr.map(item => {
					objC[item.name] = item.short;
				});
				let option = {
					grid: [{
						top: 40,
						bottom: 30,
						left: 150,
						right: 130
					}, {
						bottom: 0,
						left: 200
					}],
					//					tooltip: {
					//						trigger: 'axis',
					//						axisPointer: {
					//							type: 'shadow'
					//						},
					//					},
					xAxis: [{
						max: 'dataMax',
						show: true,
						position:'top',
						label: {
							formatter: function(n) {
								console.log(n)
								return Math.round(n);
							}
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: top,
							lineStyle: {
								color: '#FFF'
							}
						},
						splitLine: {
							show: false
						},
						//						data: years
					}, {
						type: 'category',
						data: years,
						show: false,
					}, {
						type: 'category',
						data: years,
						show: false,
					}],
					dataset: {
						source: data.find(item => {
							return item.name == startYear
						}).value
					},
					yAxis: [{
							type: 'category',
							inverse: true,
							max: 10,
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisLabel: {},
							animationDuration: 300,
							animationDurationUpdate: 300
						},
						{
							type: 'value',
							scale: true,
							max: 1000,
							show: false,
						},
						{
							type: 'value',
							scale: true,
							max: electricityArr[electricityArr.length - 2] * 5,
							min: 0,
							show: false,
						}
					],
					series: [{
							//							name: 'GDP',
							realtimeSort: true,
							seriesLayoutBy: 'column',
							type: 'bar',
							barWidth: this.optionW.barWidth,
							itemStyle: {
								normal: {
									barBorderRadius: [0, 28, 28, 0],
									color: function(ps) {
										//										console.log(ps)
										const {
											name
										} = ps;
										if(name == '中国') {
											return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
													offset: 0,
													color: 'rgb(255,114,0,1)'
												},
												{
													offset: 1,
													color: 'rgb(255,167,0,1)'
												}
											]);
										} else {
											return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
													offset: 0,
													color: 'rgb(64,134,220,1)'
												},
												{
													offset: 1,
													color: 'rgb(44,173,251,1)'
												}
											]);
										}

									}

								},
							},
							encode: {
								x: dimension,
								y: 3
							},
							label: {
								show: true,
								precision: 1,
								position: 'right',
								valueAnimation: true,
								fontFamily: 'monospace',
								padding: [0, 0, 0, 10],
								fontSize: 14,
								fontWeight: '600',
								formatter: (ps) => {
									let num = ps.dataIndex;
									if(ps.name == '中国') {
										//																				console.log(ps)
										//										console.log(num)
										return `{a|${ps.data[2]}}`;
										//										全球第${numberToChinese(num+1)}
									} else {
										//										return ''
										return `{b|${ps.data[2]}}`
									}
								},
								rich: {
									a: {
										color: '#ff7200',
										fontSize: 13
									},
									b: {
										color: 'rgb(41,176,255,1)',
										fontSize: 13
									}
								}
							}
						},
						{
							name: 'GDP',
							type: 'line',
							yAxisIndex: 1,
							xAxisIndex: 1,
							smooth: true,
							//showSymbol: false,
							symbol: 'circle',
							symbolSize: 0,
							hoverAnimation: false,
							itemStyle: {
								normal: {
									color: 'rgb(255,115,0,1)'
								}
							},
							data: []
						},
						{
							name: 'electricityArr',
							type: 'line',
							yAxisIndex: 2,
							xAxisIndex: 2,
							smooth: true,
							itemStyle: {
								normal: {
									color: 'rgb(41,176,255,1)'
								}
							},
							//showSymbol: false,
							symbol: 'circle',
							symbolSize: 0,
							data: []
						}
					],
					animationDuration: 0,
					animationDurationUpdate: updateFrequency,
					animationEasing: 'linear',
					animationEasingUpdate: 'linear',
					graphic: {
						elements: [{
							type: 'text',
							right: 80,
							bottom: 20,
							style: {
								text: startYear,
								font: 'bolder 80px monospace',
								fill: 'rgba(100, 100, 100, 0.25)'
							},
							z: 100
						}]
					}
				};
				console.log(option);
				//						myChart.setOption(option);

				this.option = option;
				for(let i = startIndex; i < years.length - 1; i++) { // years.length - 1
					(function(i) {
						setTimeout(function() {
							updateYear(years[i + 1], i + 1);
						}, (i - startIndex) * updateFrequency);
					})(i);
				}
				const imgs = require.context('static/imgs', true, /\.png$/);
				let CNs = imgs.keys().map((item, index) => {
					return getCN(item);
				})
				//				console.log(CNs);
				function updateYear(year, index) {
					let source = data.find(item => {
						return item.name == year
					}).value;
					let objCKeys = Object.keys(objC);
					let objCValues = Object.values(objC);
					let axisLabel = {
						show: true,
						margin: 1,
						textStyle: {
							fontSize: 14
						},
						formatter: function(value) {
							let b = objC[value];
							return `{${b}|}{value|${value}}`
						},
						rich: {
							value: {
								width: 58,
								align: 'left',
								color: '#fff'
							},
						}
					};
					objCKeys.map((item, index) => {
						if(CNs.indexOf(item) > -1) {
							//let image0 = require(`static/imgs/${item}.png`);
							let image0 = `static/imgs/${item}.png`;
							axisLabel.rich[objC[item]] = {
								height: _this.optionW.iconWidth,
								width: _this.optionW.iconWidth,
								align: 'right',
								backgroundColor: {
									image: image0
								}
							}
						}
					})
					option.yAxis[0].axisLabel = axisLabel;
					option.series[0].data = source;
					let total = chinaData.slice(0, index + 1);
					let total2 = electricityArr.slice(0, index + 1);
					let labelStyle = {
						show: false,
					}
					let seriesData = [];
					let seriesData2 = [];
					total.forEach((item, index2) => {
						let ob = {
							value: item,
							itemStyle: {
								color: '#ff7300',
							},
							label: labelStyle,
						}
						if(index2 == total.length - 1) {
							ob.label = {
								normal: {
									show: true,
									position: 'right',
									lineHeight: 20,
									//								backgroundColor: '#ea6f21',
									borderRadius: 5,
									//								borderColor: '#ea6f21',
									borderWidth: '1',
									padding: [0, 0, 0, 10],
									color: '#ff7200',
									fontSize: 14,
									fontWeight: '600',
									formatter: function(ps) {
										return `${ps.seriesName}\n${format(ps.data.value)}亿元`
										console.log(ps)
									}
								}
							}
						}
						seriesData.push(ob)
					})

					function format(num) {
						if(num >= 10000) {
							num = (num / 10000).toFixed(2) + '万';
						};
						return num
					}
					total2.forEach((item, index2) => {
						let ob = {
							value: item,
							itemStyle: {
								color: '#2aaefe',
							},
							label: labelStyle,
						}
						if(index2 == total2.length - 1 && total2.length > 40) {
							ob.label = {
								normal: {
									show: true,
									position: total2.length < 47 ? [10, 0] : 'right',
									//									position:'right',
									padding: [0, 0, 0, 10],
									lineHeight: 20,
									//								backgroundColor: '#ea6f21',
									borderRadius: 5,
									//								borderColor: '#ea6f21',
									borderWidth: '1',
									color: '#2aaefe',
									fontSize: 14,
									fontWeight: '600',
									formatter: function(ps) {
										//										console.log(ps)
										return `全社会用电量\n${format(ps.data.value)}亿千瓦时`
									}
								}
							}
						}
						seriesData2.push(ob)
					})
					option.series[1].data = seriesData;
					//					option.series[1].data = chinaData;
					option.series[2].data = seriesData2;
					//					option.series[2].data =electricityArr ;
					option.yAxis[1].max = chinaData[chinaData.length - 1] + 20000;
					option.yAxis[1].min = 450;
					option.graphic.elements[0].style.text = year;
					_this.option = option;
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "@/components/bar/bar.scss";
</style>