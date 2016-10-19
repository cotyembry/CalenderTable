import Chart from 'chart.js';
import $ from 'jquery';

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
//then you can use it like:
// var arr = [ 'A', 'B', 'D', 'E' ];
// arr.insert(2, 'C');

// // => arr == [ 'A', 'B', 'C', 'D', 'E' ]
// window.getGraphDataHelper = function() {
// 	return (
// 		{
// 			department:["EMERGENCY MEDICINE","URGENT CARE"],
// 			checkInToTriage:["9 mins","13 mins"],
// 			checkInToCheckOut:["1 hr 42 mins","1 hr 35 mins"],
// 			currentCheckIns:["12 mins"]
// 		} 	
// 	)
// }

// start jce added 3160926
var MARSBPCHART = {
	displayChart: function(data) {

		var data = getGraphDataHelper();
		data = MARSBPCHART.formatData(data);
		var ctx = document.getElementById('Graph1').getContext('2d');
		
		console.log(data);
		
		$.extend(data.datasets[0], {
           	fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(252, 182, 23, 0.2)",
            borderColor: "#FCB617",
            borderCapStyle: 'butt',
            borderDash: [5, 15],
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
            pointHitRadius: 10,
		});
		
		console.log(data)
		
		
		var EmergencyDeptUrgentCare = new Chart.Bar(ctx, {
			data: data
		});	
	},
	formatData: function(data) {
		/*
		*	The format the line graph is expecting is the following:
		*		data = {
		*			labels: ['labelName1', 'labelName2', ...],
		*			datasets: [
		*				{
		*					label: 'lineName',
		*					data: [yValue1, yValue2, ...]
		*				},
		*				{
		*					same format as the object in the datasets array above
		*					(each object in the datasets array will represent
		*					another line on the line graph)
		*				}
		*			]
		*		}
		*
		*/
		var dataExt = { labels: [], datasets: [] },
		//xLabels will hold 
		xLabels = [],
		//yValues will hold the data to be graphed
		yValues = [],
		//lineNames will hold the providers name
		lineNames = [],
		tempDataset = { label: '', data: [] };


		//Here I will format the department array
		//I duplicate each item in the array on the spot
		var j = data.department.length;
		for(var i = 0; i < j; i+=2) {
			data.department.insert(i+1, data.department[i]);
			j++;
		}

		for(var i = 0; i < data.department.length; i++) {
			switch(i) {	
				case 0:
					data.department[i] = data.department[i] + ' Check In To Check Out'
					break;
				case 1:
					data.department[i] = data.department[i] + ' Check In To Triage'
					break;
				case 2:
					data.department[i] = data.department[i] + ' Check In To Check Out'
					break;
				case 3:
					data.department[i] = data.department[i] + ' Check In To Triage'
					break;
				// case 4:
				// 	data.department[i] = data.department[i] + ' Check In To Check Out'
				// 	break;
				// case 5:
				// 	data.department[i] = data.department[i] + ' Check In To Check Out'
				// 	break;
				default:
					console.error("Error: in default case in index.js")
			}
		}

		data.department.push('Current Check-Ins');

		var tdata1 = 0, tdataArray = [], dataArray1 = [];
		$.each(data.checkInToTriage, function(index, value) {
			console.log(index, value)
			tdataArray = value.split(' ');
			//I need to parse through the data and make convert the data to minutes
			if(tdataArray[1] == 'hr') {

				tdata1 = 60 * parseFloat(tdataArray[0]);
				if(tdataArray[3] == 'mins' || tdataArray[3] == 'min') {
					tdata1 = tdata1 + parseFloat(tdataArray[2]);
				}
			}
			else if(tdataArray[1] == 'mins' || tdataArray[1] == 'min') {
				tdata1 = parseFloat(tdataArray[0]);
			}

			dataArray1.push(tdata1);
		
		})

		var tdata2 = 0, tdataArray = [], dataArray2 = [];
		$.each(data.checkInToCheckOut, function(index,value) {
			tdataArray = value.split(' ');
			//I need to parse through the data and make convert the data to minutes
			if(tdataArray[1] == 'hr') {

				tdata2 = 60 * parseFloat(tdataArray[0]);
				if(tdataArray[3] == 'mins' || tdataArray[3] == 'min') {
					tdata2 = tdata2 + parseFloat(tdataArray[2]);
				}
			}
			else if(tdataArray[1] == 'mins' || tdataArray[1] == 'min') {
				tdata2 = parseFloat(tdataArray[0]);
			}

			dataArray2.push(tdata2);
		
		})

		//now that I have the data from 

		dataExt = {
			labels: data.department,
			datasets: [
				{
					label: '',
					data: dataArray1.concat(dataArray2).concat(parseFloat(data.currentCheckIns))
				}
			]
		}



		return dataExt;
	}
}
//end jce 3160926



$(document).ready(function() {
	MARSBPCHART.displayChart()
})

