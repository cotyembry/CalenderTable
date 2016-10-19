import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import Graph from './components/Graph.jsx';

/*
*	      Author: 	John Coty Embry
*	Date Created: 	09-22-2016
*/

//NOTE: I altered node_modules/chart.js/src/chart.js to keep the Chart variable out of global scope (since on the particular page I'm working on, its already defined in the global scope from script tags already on the page)

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
//then you can use it like:
// var arr = [ 'A', 'B', 'D', 'E' ];
// arr.insert(2, 'C');

// // => arr == [ 'A', 'B', 'C', 'D', 'E' ]

$(document).ready(function() {
	var data = getGraphDataHelper();

	data = formatData(data);

	var id = 1;
	ReactDOM.render(<Graph data={data} id={'canvasGraph' + id} type='bar' />, document.getElementById('Graph1'))	

})

function formatData(data) {
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
	// var j = data.department.length;
	// for(var i = 0; i < j; i+=2) {
	// 	data.department.insert(i+1, data.department[i]);
	// 	j++;
	// }

	// for(var i = 0; i < data.department.length; i++) {
	// 	switch(i) {	
	// 		case 0:
	// 			data.department[i] = data.department[i]//.slice(0, 4) + ': Check In To Check Out'
	// 			break;
	// 		case 1:
	// 			data.department[i] = data.department[i]//.slice(0, 4) + ': Check In To Triage'
	// 			break;
	// 		case 2:
	// 			data.department[i] = data.department[i]//.slice(0, 4) + ': Check In To Check Out'
	// 			break;
	// 		case 3:
	// 			data.department[i] = data.department[i]//.slice(0, 4) + ': Check In To Triage'
	// 			break;
	// 		// case 4:
	// 		// 	data.department[i] = data.department[i] + ' Check In To Check Out'
	// 		// 	break;
	// 		// case 5:
	// 		// 	data.department[i] = data.department[i] + ' Check In To Check Out'
	// 		// 	break;
	// 		default:
	// 			console.error("Error: in default case in index.js")
	// 	}
	// }

	data.department.push('Current Check-Ins');

	var tdata1 = 0, tdataArray = [], dataArray1 = [];
	data.checkInToTriage.map((value, index) => {
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
	data.checkInToCheckOut.map((value, index) => {
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

	// dataExt = {
	// 	labels: data.department,
	// 	datasets: [
	// 		{
	// 			label: data.department[i].slice(0, 4) + ': Check In To Check Out',
	// 			data: dataArray1.concat(dataArray2).concat(parseFloat(data.currentCheckIns))
	// 		}
	// 	]
	// }
	
	var builtArray = dataArray1.concat(dataArray2).concat(parseFloat(data.currentCheckIns));

	var label = '',
	label1 = 'Check In To Triage',
	label2 = 'Check In To Check Out',
	label3 = 'Current Check-Ins',
	dataArray = [];
	for(var i = 0; i < data.department.length * 2; i+=2) {
		// i % 2 == 0 ? label = 'Check In To Triage' : label = 'Check In To Check Out';
		switch(i) {
			case 0: 
				label = label1;
				dataArray = dataArray1;
				break;
			case 2:
				label = label2;
				dataArray = dataArray2;
				break;
			case 4:
				label = label3;
				dataArray = parseFloat(data.currentCheckIns)
				break;
		}


		console.log(dataArray)
		if(dataArray != 12) {
			dataExt.datasets.push({
				label: label,
				data: dataArray
			})
		}
		else {
			dataExt.datasets.push({
				label: label,
				data: [0, 0, dataArray]
			})
		}

		// dataExt.datasets.push({
		// 	label: data.department[i+1],
		// 	data: []
		// })
	}

	// if(typeof data.currentCheckIns !== 'undefined') {
	// 	dataExt.datasets.push({
	// 		label: '',
	// 		data: [parseFloat(data.currentCheckIns)]
	// 	})
	// }

	dataExt.labels = data.department;

	console.log(dataExt)

	return dataExt;
}
