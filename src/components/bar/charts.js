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

export function optionBar1(){
	var colorList = ['#f36c6c', '#e6cf4e', '#20d180', '#0093ff'];
var datas = [
    {
        value: 36,
        name: '系列一',
    },
    {
        value: 54,
        name: '系列二',
    },
    {
        value: 29,
        name: '系列三',
    },
    {
        value: 25,
        name: '系列四',
    },
    {
        value: 55,
        name: '系列五',
    },
    {
        value: 69,
        name: '系列6',
    },
    {
        value: 75,
        name: '系列7',
    },
    {
        value: 85,
        name: '系列8',
    },
];
let maxArr = new Array(datas.length).fill(100);
let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    legend: {
        show: false,
    },
    grid: {
        left: 0,
        right: 0,
        containLabel: true,
    },
    xAxis: {
        show: false,
        type: 'value',
    },
    yAxis: [
        {
            type: 'category',
            inverse: true,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 30,
                },
            },
            data: datas.map((item) => item.name),
            axisLabel: {
                margin: 100,
                fontSize: 14,
                align: 'left',
                color: '#333',
                rich: {
                    a1: {
                        color: '#fff',
                        backgroundColor: {
									image: `static/imgs/中国.png`
								} ,
                        width: 30,
                        height: 30,
                        align: 'center',
                        borderRadius: 2,
                    },
                    a2: {
                        color: '#fff',
                        backgroundColor: colorList[1],
                        width: 30,
                        height: 30,
                        align: 'center',
                        borderRadius: 2,
                    },
                    a3: {
                        color: '#fff',
                        backgroundColor: colorList[2],
                        width: 30,
                        height: 30,
                        align: 'center',
                        borderRadius: 2,
                    },
                    b: {
                        color: '#fff',
                        backgroundColor: colorList[3],
                        width: 30,
                        height: 30,
                        align: 'center',
                        borderRadius: 60,
                    },
                },
                formatter: function (params) {
                    var index = datas.map((item) => item.name).indexOf(params);
                    index = index + 1;
                    if (index - 1 < 3) {
                        return ['{a' + index + '|' + index + '}' + '  ' + params].join('\n');
                    } else {
                        return ['{b|' + index + '}' + '  ' + params].join('\n');
                    }
                },
            },
        },
        {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            data: datas.map((item) => item.value),
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#333',
                 formatter: function (ps,index) {
                    console.log(ps,index);
                    if(index>2){
                        return `{3|${ps}%}`;
                    }else{
                      return `{${index}|${ps}%}`;   
                    }
                },
                rich: {
                    0: {
                        color: colorList[0],
                        fontSize: 13,
                    },
                    1: {
                        color: colorList[1],
                        fontSize: 13,
                    },
                    2: {
                        color: colorList[2],
                        fontSize: 13,
                    },
                    3: {
                        color: '#000',
                        fontSize: 13,
                    },
                },
            },
        },
    ],
    series: [
        {
            z: 2,
            name: 'value',
            type: 'bar',
            barWidth: 20,
            zlevel: 1,
            data: datas.map((item, i) => {
               let itemStyle = {
                    color: i > 3 ? colorList[3] : colorList[i],
                    barBorderRadius: 10,
                };
                return {
                    value: item.value,
                    itemStyle: itemStyle,
                };
            }),
            label: {
                show: false,
                position: 'right',
                color: '#333333',
                fontSize: 14,
                offset: [10, 0],
            },
        },
        {
            name: '背景',
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            itemStyle: {
                normal: {
                    color: 'rgba(118, 111, 111, 0.55)',
                    barBorderRadius: 10,
                },
            },
            data: maxArr,
        },
    ],
};
return option;
}
