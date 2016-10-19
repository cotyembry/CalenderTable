/*
*	       Author:	John Coty Embry
*	 Date Created: 	9-25-2016
*	Last Modified: 	9-25-2016
*/

import React from 'react';
import ReactDOM from 'react-dom';

import Bar from './components/Bar.jsx';

import Chart from 'chart.js';
import $ from 'jquery';


import {Array} from './jsUtils.js';



$(document).ready(function() {
	
	var id = 1,
	barOptions = {
		defaultFontSize: '5'
	};
	ReactDOM.render(<Bar canvasId={"bar-chart-" + id + '-' + Date.now()} options={barOptions} />, document.getElementById('Graph1'))
})
