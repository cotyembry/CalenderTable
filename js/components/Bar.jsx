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
		

		if(typeof this.props.options === 'undefined') {
			var EmergencyDeptUrgentCare = new Chart(ctx, {
				type: 'bar',
				data: data
			});
		}
		else {
			var EmergencyDeptUrgentCare = new Chart(ctx, {
				type: 'bar',
				data: data
			});
		}

		// this next part was my attempt to get the rectangles border to be dashed

		// Chart.helpers.each(EmergencyDeptUrgentCare.getDatasetMeta(0).data, function(rectangle, index) {
		//   rectangle.draw = function() {
		//     EmergencyDeptUrgentCare.chart.ctx.setLineDash([10, 10]);
		//     Chart.elements.Rectangle.prototype.draw.apply(this, arguments);
		//   }
		// }, null);

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

		if(data.department.length !== data.checkInToTriage.length && data.department.length !== data.checkInToCheckOut.length) {
			console.error('Error: unable to tell which set of data goes with the department! In Bar.jsx')
			//This error can happen if data.department looks like ["EMERGENCY MEDICINE","URGENT CARE"],
			//but data.checkInToTriage looks like ["9 mins"]
			//which element does this 9 mins go to? EMERGENCY MEDICINE, or URGENT CARE ..?
			//its expected to if looking like above, to have the data array occumpanying it
			//look like ["9 mins", "13 mins"] so the data sets will line up correctly
		}

		var dataExt = { labels: [], datasets: [] },
		//xLabels will hold 
		xLabels = [],
		//yValues will hold the data to be graphed
		yValues = [],
		//lineNames will hold the providers name
		lineNames = [],
		tempDataset = { label: '', data: [] };

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

		//this first section of if(typeof ...) code is to make sure the data is given/passed in
		//with a good data set to use. This part is data formatting pretty much
		var barSectionOne = [0, 0],
		barSectionTwo = [0, 0],
		barSectionThree = [0, 0];

		if(typeof checkInToCheckOutArray[0] === 'undefined') {
			barSectionOne[0] = 0;
		}
		if(typeof checkInToCheckOutArray[1] === 'undefined') {
			barSectionOne[1] = 0;
		}

		if(typeof checkInToTriageArray[0] === 'undefined') {
			barSectionOne[0] = 0;
		}
		if(typeof checkInToTriageArray[1] === 'undefined') {
			barSectionOne[1] = 0;
		}
		
		//this if else flow will add the appropriate department names if
		//one is missing from the data from the server
		if(data.department.length == 1) {
			data.department.unshift("EMERGENCY MEDICINE", "URGENT CARE");
		}
		else if(data.department.length == 2) {
			if(data.department[0].search(/emergency/gi) !== -1) {
				//if here this means that this is the Emergency Medicine department
				data.department.insert(1, "URGENT CARE");
			}
			else if(data.department[0].search(/urgent/gi) !== -1) {
				//if here this means that this is the Urgent Care department
				data.department.insert(0, "EMERGENCY MEDICINE");
			}
		}

		dataExt = {
			labels: data.department,
			datasets: [
				{
					label: 'Check In To Check Out',
					// data: checkInToTriageArray.concat(checkInToCheckOutArray).concat(parseFloat(data.currentCheckIns))
					data: [checkInToCheckOutArray[0], checkInToCheckOutArray[1], 0],
					fill: true,
		            backgroundColor: "rgba(252, 182, 23, 0.2)"
		            // borderColor: "#FCB617",
		            // borderDash: [5, 15],
				},
				{
					label: 'Check In To Triage',
					data: [checkInToTriageArray[0], checkInToTriageArray[1], 0],
					fill: true,
		            backgroundColor: "rgba(134, 152, 162, 0.2)"
		            // borderColor: "#8698A2",
		            // borderDash: [50, 20],
				},
				{
					label: 'Current Check-Ins',
					data: [0, 0, parseFloat(data.currentCheckIns)],
					fill: true,
		            backgroundColor: "rgba(56, 198, 244, 0.2)"
		            // borderColor: "#38C6F4",
		            // borderDash: [10, 10],
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
