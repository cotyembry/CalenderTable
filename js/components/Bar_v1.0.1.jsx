import React from 'react';

import $ from 'jquery';
import Chart from 'chart.js';


var self;

export default class Bar extends React.Component {
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
		this.displayChart(this.props.data, this.props.canvasId);
	}
	displayChart(data, idForCanvas) {

		var data = getGraphDataHelper();
		data = this.formatData(data);
		var ctx = document.getElementById(idForCanvas).getContext('2d');	
		
		var EmergencyDeptUrgentCare = new Chart.Bar(ctx, {
			data: data
		});	
	}
	render() {
		return (
			<div style={styles.canvasParent}>
				<canvas id={this.props.canvasId} style={self.state.canvas}></canvas>
			</div>
		)
	}
	formatData(data) {
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

		var tdata1 = 0, tdataArray = [], checkInToTriageArray = [];
		$.each(data.checkInToTriage, function(index, value) {
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

			checkInToTriageArray.push(tdata1);
		
		})

		var tdata2 = 0, tdataArray = [], checkInToCheckOutArray = [];
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

			checkInToCheckOutArray.push(tdata2);
		
		})

		//now that I have the data, I'll finish building the object to return

		dataExt = {
			labels: data.department,
			datasets: [
				{
					label: '',
					data: checkInToTriageArray.concat(checkInToCheckOutArray).concat(parseFloat(data.currentCheckIns))
				}
			]
		}

		return dataExt;
	}	
}


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
