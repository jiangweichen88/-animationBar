export function optionBar0(data) {
	console.log(data)
	let xData = [],
		yData = [],
		yData1 = [];
	data.data.map(item => {
		xData.push(item.name);
		yData.push(item.value);
		if(item.hasOwnProperty('value1')){
			console.log(item.value1)
			yData1.push(item.value1)
		}
	});
	
	// 绘制图表
	let option = {
		xAxis: {
			type: 'category',
			data: xData,
			axisLabel: {
				// interval: 0
				margin: 20,
			},
			splitLine: {
				show: false
			},

			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			nameGap: 30,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		yAxis: {
			type: 'value'
		},
		grid: {
			left: 0,
			right: 0,
			bottom: 10,
			top: 10,
			containLabel: true
		},
		series: [{
			data: yData,
			name: data.name,
			barWidth: 28,
			itemStyle: {
				normal: {
					color: (params) => {
						let colors = ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e86452', '#6dc8ec', '#945fb9', '#ff9845', '#1e9493', '#a28eee']
						let num = params.dataIndex % 10
						return colors[num]
					}
				}
			},
			type: 'bar'
		}]
	};
	if(yData1&&yData1.length){
		console.log(yData1)
		option.series.push({
			data: yData1,
			name: data.name,
			barWidth: 28,
			itemStyle: {
				normal: {
					color: (params) => {
						let colors = ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e86452', '#6dc8ec', '#945fb9', '#ff9845', '#1e9493', '#a28eee']
						let num = params.dataIndex % 10
						return colors[num]
					}
				}
			},
			type: 'bar'
		})
	}
	return option;

}