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
		*					data: [CheckInToCheckOutValue, CheckInToTriageValue, CurrentCheckInsValue]
		*				},
		*				{
		*					same format as the object in the datasets array above
		*					(each object in the datasets array will represent
		*					another section in the bar graph)
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


		console.log(data)


		data.department.push('Current Check-Ins'); //since this data isn't given to us from the server, I will add it here


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

		console.log(checkInToCheckOutArray, checkInToTriageArray)

		//how I hate the cartesion products....I'm sure there is a more clever way to solve this next mass of code
		if(checkInToCheckOutArray.length == 2 && checkInToTriageArray.length == 2 && data.currentCheckIns.length == 1) {
			dataExt = {
				labels: data.department,
				datasets: [
					{
						label: '',
						// data: checkInToTriageArray.concat(checkInToCheckOutArray).concat(parseFloat(data.currentCheckIns))
						data: [checkInToCheckOutArray[0], checkInToCheckOutArray[1], 0]
					},
					{
						label: '',
						data: [checkInToTriageArray[0], checkInToTriageArray[1], 0]
					},
					{
						label: '',
						data: [0, 0, parseFloat(data.currentCheckIns)]
					}
				]
			}
		}
		else if(checkInToCheckOutArray.length == 2 && checkInToTriageArray.length == 1 && data.currentCheckIns.length == 1) {

		}
		else if(checkInToCheckOutArray.length == 2 && checkInToTriageArray.length == 0 && data.currentCheckIns.length == 1) {

		}
		else if(checkInToCheckOutArray.length == 1 && checkInToTriageArray.length == 2 && data.currentCheckIns.length == 1) {

		}
		else if(checkInToCheckOutArray.length == 0 && checkInToTriageArray.length == 2 && data.currentCheckIns.length == 1) {

		}
		else if(checkInToCheckOutArray.length == 2 && checkInToTriageArray.length == 2 && data.currentCheckIns.length == 0) {

		}
		else if(checkInToCheckOutArray.length == 2 && checkInToTriageArray.length == 1 && data.currentCheckIns.length == 0) {

		}
		else if(checkInToCheckOutArray.length == 1 && checkInToTriageArray.length == 2 && data.currentCheckIns.length == 0) {

		}
		else if(checkInToCheckOutArray.length == 1 && checkInToTriageArray.length == 1 && data.currentCheckIns.length == 0) {

		}
		else if(checkInToCheckOutArray.length == 1 && checkInToTriageArray.length == 1 && data.currentCheckIns.length == 1) {

		}
		else if(checkInToCheckOutArray.length == 0 && checkInToTriageArray.length == 1 && data.currentCheckIns.length == 0) {

		}
		else if(checkInToCheckOutArray.length == 1 && checkInToTriageArray.length == 0 && data.currentCheckIns.length == 1) {

		}
		else if(checkInToCheckOutArray.length == 0 && checkInToTriageArray.length == 0 && data.currentCheckIns.length == 1) {

		}
		else if(checkInToCheckOutArray.length == 0 && checkInToTriageArray.length == 0 && data.currentCheckIns.length == 0) {

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
