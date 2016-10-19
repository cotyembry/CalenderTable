import React from 'react';

import $ from 'jquery';
import Chart from 'chart.js';



var self;

export default class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.store = [];
		self = this;
		var totalWidth = $(document).outerWidth();
		this.state = {
			canvas: {
				width: 400,
				height: 400
			}
		}
		
	}
	componentDidMount() {
		$(window).resize(this.resize);
		this.displayChart(this.props.data, this.props.id);
	}
	render() {
		return (
			<div style={styles.canvasParent}>
				<canvas id={this.props.id} style={self.state.canvas}></canvas>
			</div>
		)
	}
	resize() {
		// var totalWidth = $(document).outerWidth();
		// self.setState({
		// 	canvas: {
		// 		width: totalWidth,
		// 		height: 400
		// 	}
		// })
	}
	displayChart(data, id) {
		//here is where I actually call the new Chart stuff to use the Chart.js library
		
		//set the width
		//document.getElementById(contextId).parentNode.style.width = $(document).outerWidth() + 'px';

		//for each dataset, extend/add the properties to the data object to be able to
		//finalize the data needed to create the graph

		$.each(data.datasets, function(index) {
			switch(index) {
				case 0:	
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(252, 182, 23, 0.2)",
			            borderColor: "#FCB617",
			            borderCapStyle: 'butt',
			            // borderDash: [5, 15],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "#FCB617",
			            pointBackgroundColor: "#FFFFFF",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "#fdd068",
			            pointHoverBorderColor: "#FCB617",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10
					});

					break;
				
				case 1:
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(134, 152, 162, 0.2)",
			            borderColor: "#8698A2",
			            borderCapStyle: 'butt',
			            // borderDash: [50, 20],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "#8698A2",
			            pointBackgroundColor: "#FFFFFF",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "#a9b5bc",
			            pointHoverBorderColor: "#8698A2",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10
					});				
					break;
				case 2:
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(56, 198, 244, 0.2)",
			            borderColor: "#38C6F4",
			            borderCapStyle: 'butt',
			            // borderDash: [10, 10],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "#38C6F4",
			            pointBackgroundColor: "#FFFFFF",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "#7bd1d1",
			            pointHoverBorderColor: "#38C6F4",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10
					});	
					break;
				case 3:
					//TODO: pick different colors from here and to the end to the default case
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(217, 31, 38, 0.2)",
			            borderColor: "#d91f26",
			            borderCapStyle: 'butt',
			            // borderDash: [25, 25],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "#D91F26",
			            pointBackgroundColor: "#FFFFFF",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "#e64d52",
			            pointHoverBorderColor: "#D91F26",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10,
					});	
					break;
				case 4:
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(0, 0, 0, 0.2)",
			            borderColor: "rgba(0, 0, 0, 1)",
			            borderCapStyle: 'butt',
			            // borderDash: [5, 5, 10],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgb(0, 0, 0)",
			            pointBackgroundColor: "#FFFFFF",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(0, 0, 0, 0.2)",
			            pointHoverBorderColor: "#333333",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10
					});	
					break;
				case 5:
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(128, 0, 128, 0.2)",
			            borderColor: "rgba(128, 0, 128, 0.2)",
			            borderCapStyle: 'butt',
			            // borderDash: [75, 75],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(128, 0, 128, 0.2)",
			            pointBackgroundColor: "#FFFFFF",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "#cc00cc",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10
					});	
					break;
				case 6:
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(51, 204, 51, 0.2)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            // borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#FFFFFF",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "#85e085",
			            pointHoverBorderColor: "rgba(51, 204, 51, 0.2)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10
					});	
					break;
				default:
					$.extend(data.datasets[index], {
			           	fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(255, 165, 0, 0.2)",
			            borderColor: "rgba(255, 165, 0, 1)",
			            borderCapStyle: 'butt',
			            // borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(255, 165, 0, 1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "#ffc14d",
			            pointHoverBorderColor: "rgba(255, 165, 0, 1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 5,
			            pointHitRadius: 10
					});	
			}
		})
		
		//now that the data object has the new properties to finish up the necessary data,
		//its time to get the context of the graph and let the canvas go at it and create
		//the graph


		var context = document.getElementById(id).getContext('2d');
		var type;
		typeof this.props.type === 'undefined' ? type = 'line' : type = 'bar'

		var chart = new Chart(context, {
			type: type,
			data: data
		})
		
		//Chart.defaults.global.responsive = true;
		//Chart.defaults.global.maintainAspectRatio = false;
		
	}	
	/*
	displayCharts(data, canvasIds) {
		// $.each(canvasIds, function(indexSuper, id) {
			//loop through on another $.each
			//pretty much just copy past the code already written for this
			// var something = [20, 30];
			// $.each(something, function(index) {
			// $.extend(data, { labels: ['One'] })
			
			/*data.labels = ['One']
				var context = document.getElementById(canvasIds).getContext('2d');
				var index = 0;
				var chart = new Chart(context, {
					type: 'line',
					data: {
						labels: data.labels,
						datasets: {
							label: data.datasets.label,
							data: data.datasets.data //todo: check to make sure this is correct
						}
					}
				});//remove following space to finish the comment* /

			// });

		// })
		var ctx = document.getElementById(canvasIds).getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		        datasets: [{
		            label: '# of Votes',
		            data: [12, 19, 3, 5, 2, 3],
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(255, 159, 64, 0.2)'
		            ],
		            borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
	}
	*/
}

/*
style1 = {...}
style2 = {...}

<div style={$.extend({}, style1, style2)}></div>
*/


var styles = {
	canvasParent: {
		// width: '100%',
		// height: 200
	},
	get canvas() {
		var totalWidth = $(document).outerWidth();
		return {
			// background: 'yellow',
			width: totalWidth + 'px',
			height: '400px'
		}

	}
}
