/*
* jquery.fixheadertable
*
* Copyright (c) 2010 Benjamin Léouzon
* http://www.tablefixedheader.com/
*
* Licensed under MIT
* http://www.opensource.org/licenses/mit-license.php
* 
* http://docs.jquery.com/Plugins/Authoring
* jQuery authoring guidelines
*
* Launch  : December 2010
* Version : 2.0
*/

//start jce 3160428 added to allow the outerDivForTableId to be unique
//I noticed that if this function gets called multiple times on a page
//it was only making the outerDiv Id = 'outerDivForTableId' which does
//not create a unique id, so I'm approaching the problem this way
//(refer to the if else flow below) to not cause any regression faults
//for the pages that only have the .fixheadertable() function called on
//the page one time
var fixHeaderTableObject = {
	idNumber: 0,
	outerDivForTableId: "outerDivForTableId",
	tableBodyId: "tableBodyId",
	mainWrapperChildId: "mainWrapperChildId",
	headId: "headId",
	headtableId: "headtableId",
	t_fixed_header_main_wrapperId: "t_fixed_header_main_wrapperId"
};
//end jce 3160428

(function(jQuery) { 

	jQuery.fn.fixheadertable = function(options) {
		//start jce 3160428 added
		if(fixHeaderTableObject.idNumber === 0) {
			//I do this because I don't want to cause any regression faults to where elements that have had
			//the Id of 'outerDivForTableId' and only had this function called once will not have any adverse
			//effects.
			fixHeaderTableObject.idNumber = "";
		}
		else { 
			if(fixHeaderTableObject.idNumber == "") {
				//if it is null, I want the second time it is called for the end of the id to be the number 2
				fixHeaderTableObject.idNumber = 2;
			}
			else {
				//if it isn't null, just increment the id number
				fixHeaderTableObject.idNumber++;	
			}
			
		}
		//end jce 3160428

		var defaults = {  
				
			caption		 : '',
			
			showhide	 : true,
			
			theme		 : 'ui',
			
			height		 : null,
			
			width		 : null, 
			
			minWidth	 : null,
			
			minWidthAuto : false,
			
			colratio	 : [],
			
			whiteSpace	 : 'nowrap',
			
			addTitles	 : false,
			
			zebra		 : false,
			
			zebraClass	 : 'ui-state-active',
			
			sortable	 : false, 
			
			sortedColId	 : null,
			
			sortType	 : [],
			
			dateFormat	 : 'd-m-y',
			
			pager		 : false,
			
			rowsPerPage	 : 10,
			
			resizeCol	 : false,
			
			minColWidth	 : 100,
			
			wrapper		 : true,
			
			collapsed	 : false
		};  
		
		var options = jQuery.extend(defaults, options);
		
		
		function util_getComputedStyle(element, property) {
			
			if (element.currentStyle) {
				
				var y = x.currentStyle[property];
				
			} else if (window.getComputedStyle) {
				
				var y = document.defaultView.getComputedStyle(element, null).getPropertyValue(property);
			}
			
			return y;
		}
		
		function util_getScrollbarWidth () {
						
			var inner = jQuery('<p/>').addClass('t_fixed_header_scroll_inner');
			
			var outer = jQuery('<div/>').addClass('t_fixed_header_scroll_outer');
			
			outer.append(inner);
			
			jQuery(document.body).append(outer);
			
			var w1 = inner[0].offsetWidth;  
			
			outer.css('overflow', 'scroll');
			
			var w2 = inner[0].offsetWidth;  
			
			if (w1 == w2) w2 = outer[0].clientWidth;  
			
			outer.remove();
			
			return (w1 - w2);			
		}
		
		function util_parseDate (format, date) {
			
			var tsp = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0}, k, hl, dM;
			
			if(date && date !== null && date !== undefined){
				
				date = jQuery.trim(date);
				
				date = date.split(/[\\\/:_;.\t\T\s-]/);
				
				format = format.split(/[\\\/:_;.\t\T\s-]/);
				
				var dfmt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				
				var afmt = ["am", "pm", "AM", "PM"];
				
				var h12to24 = function(ampm, h){
					
					if (ampm === 0){ if (h == 12) { h = 0;} }
					
					else { if (h != 12) { h += 12; } }
					
					return h;
				};
				
				for (k=0, hl=format.length; k < hl; k++){
					
					if(format[k] == 'M') {
						
						dM = jQuery.inArray(date[k],dfmt);
						
						if(dM !== -1 && dM < 12){date[k] = dM+1;}
					}
					
					if(format[k] == 'F') {
						
						dM = jQuery.inArray(date[k],dfmt);
						
						if(dM !== -1 && dM > 11){date[k] = dM+1-12;}
					}
					
					if(format[k] == 'a') {
						
						dM = jQuery.inArray(date[k],afmt);
						
						if(dM !== -1 && dM < 2 && date[k] == afmt[dM]){
							
							date[k] = dM;
							
							tsp.h = h12to24(date[k], tsp.h);
						}
					}
					
					if(format[k] == 'A') {
						
						dM = jQuery.inArray(date[k],afmt);
						
						if(dM !== -1 && dM > 1 && date[k] == afmt[dM]){
							
							date[k] = dM-2;
							
							tsp.h = h12to24(date[k], tsp.h);
						}
					}
					
					if(date[k] !== undefined) {
						
						tsp[format[k].toLowerCase()] = parseInt(date[k],10);
					}
				}
				
				tsp.m = parseInt(tsp.m,10)-1;
				
				var ty = tsp.y;
				
				if (ty >= 70 && ty <= 99) {tsp.y = 1900 + tsp.y;}
				
				else if (ty >=0 && ty <=69) {tsp.y= 2000 + tsp.y;}
			}
			
			return new Date(tsp.y, tsp.m, tsp.d, tsp.h, tsp.i, tsp.s,0);
		}
		
		return this.each(function() {
			var _table				= jQuery(this);
			
			var main_wrapper		= null;
			
			var nbcol 				= jQuery('thead th', this).length;
			
			var _initialWidth		= jQuery(this).width();
			
			var _wrapper 			= null;
			
			var _headerscontainer	= null;
			
			var _fillScrollbar 		= null;
			
			var _body 				= null;
			
			var _headers			= null;
			
			var _scrollWidth		= util_getScrollbarWidth();
			
			var _colgroup			= buildColgroup(nbcol);
			
			var _colgroup_body		= null;
			
			var _nbRowsPerPage		= 10;
			
			var _new_nbRowsPerPage  = null;
			
			var _nbpages			= null;
			
			var _nbpagesDiv			= null;
			
			var _currentpage 		= null;
			
			var _pager				= null;
			
			var _objectTable		= null;
			
			var _stripNum 			= /[\$,%]/g;
			
			var _resizeInfo 		= null;
			
			var _resizeGhost		= null;
			
			function buildTop (table) {
																											 //jce added id 3160328
				//_fillScrollbar = jQuery('<div class="headtable ui-state-default" style="margin-right : 0px" id="headtableId"></div>');
				_fillScrollbar = jQuery('<div class="headtable ui-state-default" style="margin-right : 0px" id="' + fixHeaderTableObject.headtableId + fixHeaderTableObject.idNumber + '"></div>'); //jce 3160428 changed from the line above to this current one to give a unique id
				
				_headerscontainer = _fillScrollbar;
				
				_headerscontainer.insertBefore(table);
			}
			
			function buildColgroup (nbcol) {				
					
				var colgroup = jQuery('<colgroup />');				
				
				if (options.colratio.length == 0) {
				
					var temp = null;
					
					for (var i = 0; i < nbcol; i++) {
						
						temp = jQuery('<col style="width : ' + (100/nbcol) + '%" />');
						
						colgroup.append(temp);

						temp = null;
					}
				
				} else if (options.colratio.length == nbcol) {
					
					var cw = 0;
					
					for (var i = 0; i < nbcol; i++) {
						
						temp = jQuery('<col style="width : ' + options.colratio[i] + 'px" />');
						
						colgroup.append(temp);

						temp = null;
						
						cw += parseInt(options.colratio[i]);
					}
					
					jQuery(_table).css('width', cw + 'px');
				}
				
				return colgroup;
			}
			
			function sortColumn (table, number, sens, th) {
				
				if ((options.sortType.length != 0) && (options.sortType.length == nbcol)) {
					
					var type = options.sortType[number];
					
					if (type == 'float') {						
						
						getSortKey = function(cell) {
							
							var key = parseFloat( String(cell).replace(_stripNum, ''));
							
							return isNaN(key) ? 0.00 : key;
						}
						
					} else if (type == 'integer') {
						
						getSortKey = function(cell) {
							
							return cell ? parseFloat(String(cell).replace(_stripNum, '')) : 0;							
						}
						
					} else if (type == 'date') {
						
						getSortKey = function(cell) {
							
							return util_parseDate(options.dateFormat, cell).getTime();
						}
						
					} else {
						
						getSortKey = function(cell) {
							
							if(!cell) { cell =""; }
							
							return jQuery.trim(String(cell).toLowerCase());
						}
					}
					
				} else {
					
					getSortKey = function(cell) {
						
						if(!cell) { cell =""; }
						
						return jQuery.trim(String(cell).toLowerCase());
					}
				}
				
				_objectTable.sort(function(a, b){
										
					var x = getSortKey(a[number]);
					
				    var y = getSortKey(b[number]);
				    
				    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				})
					
				if(sens == 'DESC'){
					
					_objectTable.reverse();
				}
				
				(options.pager) ? moveToPage(table) : objectToTable(_objectTable, table);
			}
			
			function objectToTable(objectArray, table) {
				
				var body = jQuery('tbody', table);
								
				body.children().remove();
				
				if(options.zebra){
					
					for (var i = 0; i < objectArray.length; i++){
						
						(i%2) ? (tr = jQuery('<tr class="' + options.zebraClass + '"></tr>')) : (tr = jQuery('<tr></tr>'));									
						
						for (var j in objectArray[i]){
							
							tr.append(jQuery('<td class="ui-widget-content"></td>').html(objectArray[i][j]));
						}	
						
						body.append(tr);
					}
					
				} else {
				
					for (var i = 0; i < objectArray.length; i++){
							
						tr = jQuery('<tr></tr>');				
						
						for (var j in objectArray[i]){
							
							tr.append(jQuery('<td class="ui-widget-content"></td>').html(objectArray[i][j]));
						}	
						
						body.append(tr);
					}
				}
			}
			
			function tableToObject(table) {

				var objectArray = [];
				
				jQuery('tr', table).each(function(i){
					
					var data = {};
					
					jQuery('td', this).each(function(j){
						
						data[j] = jQuery(this).html();
					})
					
					objectArray.push(data);
				});	

				return objectArray;
			}
			
			function buildHeaders(table) {
													//jce 3160408 added id="headId"
				//_headers = jQuery('<table class="head" id="headId"/>').append(_colgroup).append(jQuery('thead', table));
				_headers = jQuery('<table class="head" id="' + fixHeaderTableObject.headId + fixHeaderTableObject.idNumber + '"/>').append(_colgroup).append(jQuery('thead', table)); //jce 3160428 changed from the line above to this current one to give a unique id
				
				_headerscontainer.append(_headers);	
				
				_headers.wrap('<div></div>');
				
				var tab_headers = jQuery('th', _headers);
				
				tab_headers.addClass('ui-widget-content ui-state-default');
								
				if(options.sortable){
					
					var th_div_sort = null;
					
					tab_headers.each(function(i){
						
						jQuery(this).contents().wrapAll('<div class="ui-sort"></div>');
						
						th_div_sort = jQuery('div.ui-sort', this);
						
						th_div_sort.click(function(){
							
							tab_headers.removeClass('ui-state-hover');
							
							jQuery(this).parent().removeClass('ui-state-active').addClass('ui-state-hover');
							
							jQuery('span.ui-icon', tab_headers).remove();
							
							if(jQuery(this).hasClass('sortedUp')){
								
								sortColumn(table, i, "DESC", this);
								
								jQuery(this).removeClass('sortedUp').addClass('sortedDown');
								
								jQuery(this).append('<span style="display : inline-block; vertical-align : middle" class="ui-icon ui-icon-triangle-1-s"></span>');
								
							} else {
								
								sortColumn(table, i, "ASC", this);
								
								jQuery(this).removeClass('sortedDown').addClass('sortedUp');
								
								jQuery(this).append('<span style="display : inline-block; vertical-align : middle" class="ui-icon ui-icon-triangle-1-n"></span>');
							}
							
							_headerscontainer[0].scrollLeft = _body[0].scrollLeft;
						})
					});
				    
					jQuery('div.ui-sort', tab_headers).addClass('hover');
				}
			 
				if(options.resizeCol && (options.colratio.length == nbcol)){
					
					
					tab_headers.each(function(i){
						
						var resizer = jQuery('<span class="ui-resize"></span>');
						
						jQuery(this).prepend(resizer);
						
						resizer.mousedown(function(e){
							
							dragStart(i, e);
							
							return false;
						})						
					});
					
					_main_wrapper.mousemove(function(e){
						
						if (_resizeInfo){
							
							dragMove(e);
							
							return false;
						}
					}).mouseup(function(){
						
						if (_resizeInfo){
							
							dragEnd();
							
							return false;
						}
						
						return true;
					});
				
					function getOffset(col){
						
						var ret = 0, cell = jQuery('col', _colgroup), handler = jQuery('th > span.ui-resize', _headers)[col], bso = _body[0].scrollLeft;
						
						for(var i = 0; i < col; i++){
							
							ret += parseInt(cell[i].style.width);
						}
						
						return handler.offsetLeft + 5 + ret - bso;
					}
					
					function dragStart(i, x){
						
						_resizeInfo = { id : i, startX : x.clientX , initTableWidth : getColratioWidth(), offset : getOffset(i) };
						
						_resizeGhost.css({ display : 'block', height : _headerscontainer.height() + _body.height() + 2 + 'px', left : _resizeInfo.offset + 'px', cursor : 'col-resize' });
					}
					
					function dragMove(x){
						
						var diff = x.clientX - _resizeInfo.startX;
						
						_resizeInfo.newWidth = parseInt(jQuery('col', _colgroup)[_resizeInfo.id].style.width) + diff;
						
						_resizeInfo.newTableWidth = _resizeInfo.initTableWidth + diff;
						
						if(_resizeInfo.newWidth > parseInt(options.minColWidth)){
						
							_resizeGhost.css({ left :  _resizeInfo.offset + diff + 'px' });
							
						} else {
							
							_resizeInfo.newWidth = parseInt(options.minColWidth);
						}
					}
					
					function dragEnd(){
						
						jQuery(_colgroup.children()[_resizeInfo.id]).css({ width : _resizeInfo.newWidth + 'px' });
						
						jQuery(_colgroup_body.children()[_resizeInfo.id]).css({ width : _resizeInfo.newWidth + 'px' });
						
						var wrapper_width = _resizeInfo.newTableWidth;
						
						_headers.css({ 'width' : wrapper_width + 'px' });
						
						jQuery(_table).css({ 'width'	: wrapper_width + 'px' });
							
						_resizeInfo = null;
						
						_resizeGhost.css({ display : 'none' });
						
						_headerscontainer[0].scrollLeft = _body[0].scrollLeft;
					}
				}
			}
			/*
			function isIE6_7() {
				
				if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
					
	        		var ieversion = new Number(RegExp.jQuery1);
	        		 
	 				if (ieversion == 7 || ieversion == 6) {
	 					
	        				return true;
	        				
	        		} else {
	        				return false;
	        		}
	        	}
			}*/
			/*
			function isIE8() {
				
				if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
					
	        		var ieversion = new Number(RegExp.jQuery1);
	        		 
	 				if (ieversion == 8) {
	 					
	        				return true;
	        				
	        		} else {
	        				return false;
	        		}
	        	}
			}*/
			
			function buildBody (table) {
				//_body = jQuery('<div class="body ui-widget-content" id="tableBodyId"></div>').insertBefore(table).append(table);
				_body = jQuery('<div class="body ui-widget-content tableBodyClass" id="' + fixHeaderTableObject.tableBodyId + fixHeaderTableObject.idNumber + '"></div>').insertBefore(table).append(table); //jce 3160428 changed the above line of code to this current one
				
				if(options.height != null &&  !isNaN(parseInt(options.height))) {
				
					//_body.css('height', options.height + 'px');
				}
				
				_colgroup_body = _colgroup.clone();
				
				//start jce 3160309 added 
				if(typeof _colgroup_body !== 'undefined') {
					//jce 3160309 adding an invisible header before this table body since this body 
					//is actually getting separated from the actual header declared in the html so this 
					//is sort of a patch for the DataTables library to work correctly.
					//Now to add the invisible headers
					var tableHeader = document.createElement("thead");
					tableHeader.id = "invisibleTableHeader";
					tableHeader.className = 'invisibleTableHeader';										//jce added 3160804
					var tableRow = document.createElement("tr");
					tableRow.style.display = "none";
					var headTable = document.getElementById('headId' + fixHeaderTableObject.idNumber);	//jce added 3160603
					//var headTable = document.getElementById('headId');								//jce changed on 3160804
					var headTable_thLength = headTable.getElementsByTagName('th').length;				//jce added 3160603
					for(var i = 1; i < headTable_thLength + 1; i++) {									//jce changed 3160603
						var thElement = document.createElement("th");
						thElement.id = "thId" + i;
						//thElement.innerHTML = "test";
						tableRow.appendChild(thElement);
					}
					//add the stuff just created to the header
					tableHeader.appendChild(tableRow);
					//now add the tableHeader to the actual table
					jQuery(table).prepend(tableHeader);
				}
				//end jce 3160309
				
				jQuery(table).prepend(_colgroup_body);
				
				jQuery('td', table).addClass('ui-widget-content');
				
				jQuery(table).wrap('<div></div>');
				
				if (options.addTitles == true) {
				
					jQuery('td', table).each(function() {
						
							jQuery(this).attr('title', jQuery(this).text());
					});			
				}
				
				if (options.zebra) {
					
					$('tr:odd', table).addClass(options.zebraClass);
				}
			}
			
			function adaptScroll (table) {
				
				var scrollwidth = _scrollWidth;
	        	/*
	        	if(isIE6_7()){
	        		
	        		scrollwidth = 0; 
	        	}*/
	        	
	        	var width = 0;
	        							
				if (parseInt($(table).height()) > parseInt(options.height)) { 
									
					width = scrollwidth;
					
					overflow = 'scroll';
					
				} else { 
									
					width = 0;
						
					overflow = 'auto';
				}
				
				//if($.browser.msie && options.height) {
				
				//	width = scrollwidth;
					
				//	overflow = 'scroll';
				//}
				
				_fillScrollbar.css('margin-right', width);
				
				return overflow;				
			}
			
			function restrictRows(table, nbrows) {
							
				var length = _objectTable.length;
				
				var limit = 0;
				
				if(length < nbrows) {
					
					limit = length;
				
				} else {
					
					limit = nbrows;
				}
				
				var _objectTableSliced = _objectTable.slice(0, limit);
				
				objectToTable(_objectTableSliced, table);	
				
				_nbpages = Math.ceil(length / nbrows);
				
				_currentpage = 1;
				
				_nbpagesDiv.html('Showing page ' + _currentpage + ' of ' + _nbpages);
				
				_body.css('overflow-y', adaptScroll(table));
				
				$('tr:last td', table).css('border-bottom-width', '1px');
			}
			
			function moveToNextPage(table) {
				
				_currentpage++;
				
				if(_currentpage >= (_nbpages)) {
					
					_currentpage = (_nbpages);
				}
					
				moveToPage(table);
			}
			
			function moveToPreviousPage(table) {
				
				_currentpage--;
				
				if(_currentpage <= 1) {
					
					_currentpage = 1;
				}
				
				moveToPage(table);
			}
			
			function moveToPage(table) {
				
				var length = _objectTable.length;
				
				var start, limit = 0;
				
				start = (_currentpage - 1) * _new_nbRowsPerPage;
				
				if(length < (_currentpage * _new_nbRowsPerPage)) {
					
					limit = length;
				
				} else {
					
					limit = (_currentpage * _new_nbRowsPerPage);
				}
				
				var _objectTableSliced = _objectTable.slice(start, limit);
				
				objectToTable(_objectTableSliced, table);
				
				_nbpagesDiv.html('Showing page ' + _currentpage + ' of ' + _nbpages);
				
				_body.css('overflow-y', adaptScroll(table));	
				
				$('tr:last td', table).css('border-bottom-width', '1px');
			}
			
			function buildNavButton(className, callbackClick, buttonClass) {
				
				var button = $('<div class="button ui-state-default ' + buttonClass + '"><span class="ui-icon ' + className + '">&nbsp;</span></div>');
				
				_pager.append(button);
				
				button.mouseover(function(){
						
					$(this).addClass('ui-state-hover');
						
				}).mousedown(function(){
						
					$(this).addClass('ui-state-active');
						
				}).mouseup(function(){
						
					$(this).removeClass('ui-state-active');
						
				}).mouseout(function(){
					
					$(this).removeClass('ui-state-active');
					
					$(this).removeClass('ui-state-hover');
					
				}).click(callbackClick);	
			}
			
			function buildPager(table) {
				
				_pager = $('<div class="pager ui-widget-header ui-corner-bottom ui-widget-content"></div>');
				
				_main_wrapper.append(_pager);
				
				buildNavButton('ui-icon-arrowthickstop-1-e', function(){
					
					_currentpage = _nbpages;
					
					moveToPage(table);
				}, 'ui-corner-right');
				
				buildNavButton('ui-icon ui-icon-arrowthick-1-e', function(){
					
					moveToNextPage(table);
				}, 'noborder');
				
				buildNavButton('ui-icon ui-icon-arrowthick-1-w', function(){
					
					moveToPreviousPage(table);
				}, 'noborder');
				
				buildNavButton('ui-icon-arrowthickstop-1-w', function(){
					
					_currentpage = 1;
					
					moveToPage(table);
				}, 'ui-corner-left noborder');
				
				_button_set = 
				
				$('<div id="' + table.id + '_radio" style="float : left">' + 
				
					'<input type="radio" id="' + table.id + '_show_10_rows" name="' + table.id + '_radio"/><label for="'  + table.id + '_show_10_rows">10</label>' + 
					'<input type="radio" id="' + table.id + '_show_25_rows" name="' + table.id + '_radio"/><label for="'  + table.id + '_show_25_rows">25</label>' + 
					'<input type="radio" id="' + table.id + '_show_50_rows" name="' + table.id + '_radio" /><label for="' + table.id + '_show_50_rows">50</label>' + 
					'<input type="radio" id="' + table.id + '_show_100_rows" name="' + table.id + '_radio"/><label for="' + table.id + '_show_100_rows">100</label>' + 
				
				'</div>');
									
				_pager.append(_button_set);
				
				$('#' + table.id + '_show_10_rows', _pager).click(function(){
						
						_new_nbRowsPerPage = _nbRowsPerPage;
						
						restrictRows(table, _new_nbRowsPerPage);
				});
				
				$('#' + table.id + '_show_25_rows', _pager).click(function(){
						
						_new_nbRowsPerPage = _nbRowsPerPage * 2.5;
						
						restrictRows(table, _new_nbRowsPerPage);
				});
				
				$('#' + table.id + '_show_50_rows', _pager).click(function(){
					
						_new_nbRowsPerPage = _nbRowsPerPage * 5;
					
						restrictRows(table, _new_nbRowsPerPage);
				});
				
				$('#' + table.id + '_show_100_rows', _pager).click(function(){
					
						_new_nbRowsPerPage = _nbRowsPerPage * 10;
					
						restrictRows(table, _new_nbRowsPerPage);
				});
				
				_nbpagesDiv = $('<div class="page_infos"></div>');
				
				_pager.append(_nbpagesDiv);
				
				_new_nbRowsPerPage = _nbRowsPerPage;
				
				$('#' + table.id + '_show_' + options.rowsPerPage + '_rows', _pager).click();
				
				_button_set.buttonset();
			}
			
			function getColratioWidth(){
				
				var tw = 0;
				
				for(var i = 0; i < options.colratio.length; i++){
					
					tw += parseInt(options.colratio[i]);
				}
				
				return tw;
			}

			/***********************/
			/********* MAIN ********/
			/***********************/
																				   ////jce added this additional class on 3160328 to this line of code
			_wrapper = $('<div/>').addClass('t_fixed_header ui-state-default default t_fixed_header_3160328 ' + options.theme).insertBefore(this).append(this);
			
			_wrapper.css('border', 'none').css('font-weight', 'normal');
																								//jce added this additional class on 3160328 to this line of code
			//_main_wrapper = $('<div class="t_fixed_header_main_wrapper ui-widget ui-widget-header table_fixed_header_main_wrapper_3160328 ' + options.theme + '" id="t_fixed_header_main_wrapperId" ></div>');
			_main_wrapper = $('<div class="t_fixed_header_main_wrapper ui-widget ui-widget-header table_fixed_header_main_wrapper_3160328 ' + options.theme + '" id="' +  fixHeaderTableObject.t_fixed_header_main_wrapperId + fixHeaderTableObject.idNumber + '" ></div>'); //jce changed from the above line to the current one to create a unique id
			
			if (options.whiteSpace == 'normal') {
			
				_wrapper.addClass('t_fixed_header_wrap');
			}		
			
			buildTop(this);
			
			buildHeaders(this);	
			
			buildBody(this);
			
			if(options.wrapper){
			
				//var tampon = _wrapper.wrap('<div class="ui-widget ui-widget-content ui-corner-all" style="margin-top: 5px; padding : 5px; font-size : 1em;;" id="outerDivForTableId"></div>').parent();
				var tampon = _wrapper.wrap('<div class="ui-widget ui-widget-content ui-corner-all outerDivForTableClass" style="margin-top: 5px; padding : 5px; font-size : 1em;" id="' + fixHeaderTableObject.outerDivForTableId + fixHeaderTableObject.idNumber + '"></div>').parent(); //3160428 jce changed code from the line above to this line to make unique id's if this function is called multiple times on a single page
				
			} else {
				
				var tampon = _wrapper.wrap('<div></div>').parent();
			}
			
			if (options.width != null && !isNaN(parseInt(options.width)) && options.width > 0) {
				
				tampon.css('width', options.width + 'px');	
			}
			
			var res = _wrapper.detach();
			
			//var main_wrapper_child = $('<div class="t_fixed_header_main_wrapper_child" id="mainWrapperChildId" style="height: 100%; overflow-y:auto;"></div>');
			var main_wrapper_child = $('<div class="t_fixed_header_main_wrapper_child" id="' + fixHeaderTableObject.mainWrapperChildId + fixHeaderTableObject.idNumber + '" style="height: 100%; overflow-y:auto;"></div>'); //jce 3160428 changed the line above to this line
			
			_main_wrapper.append(main_wrapper_child);
			
			main_wrapper_child.append(res);
			
			tampon.append(_main_wrapper);	
			/*
			if(isIE6_7()){
			
				_body.css('margin-bottom', 17 + 'px');
			}*/
			
			if (options.caption != '') {
				
				var caption = $('<div class="t_fixed_header_caption ui-widget-header ui-corner-top" id="t_fixed_header_captionId">' + options.caption + '</div>');
				
				_main_wrapper.prepend(caption).addClass('ui-corner-all');
				
				if (options.showhide) {
				
					var showhide = $('<div style="cursor : pointer; display : inline-block; vertical-align : middle; background : none; border : none;" class="ui-state-active"><span class="ui-icon ui-icon-triangle-1-n">&nbsp;</span></div>');
					
					caption.append(showhide);
									
					showhide.click(function(){
						
						main_wrapper_child.toggle();
						
						caption.toggleClass('toggle')
						
						if(_pager) _pager.toggle();
						
						$('span', showhide).toggleClass('ui-icon-triangle-1-s');
					});
					

				
				}
			} 	
			
			if (options.sortable || options.pager) {
				
				_objectTable = tableToObject(this);
			}
			
			if (options.pager) {
				buildPager(this);
			}
			
			if (options.showhide) {
				
				/* RVU: added option to all table to be collapsed on default */
					if (options.collapsed){
						
						main_wrapper_child.toggle();
						
						caption.toggleClass('toggle')
						
						if(_pager) _pager.toggle();
						
						$('span', showhide).toggleClass('ui-icon-triangle-1-s');
						
					}
			}
			
			if(options.sortable && !isNaN(parseInt(options.sortedColId))) {
				
				var cur_th = $('th', _headers)[options.sortedColId];
				
				$(cur_th).addClass('ui-state-hover')
				
				$('div.ui-sort', cur_th).click();
			}
			
			if(options.resizeCol && (options.colratio.length == nbcol)){
			
				_resizeGhost = $('<div class="ui-resize-ghost ui-widget-header" style="height : ' + _main_wrapper.parent().height() + 'px"></div>');
				
				_wrapper.append(_resizeGhost);
			}
			
			_body.css('overflow-y', adaptScroll(this));
			
			if (options.minWidth != null && !isNaN(parseInt(options.minWidth)) && options.minWidth > 0) {
				
				var minWidth = options.minWidth + 'px';
				
			} else if (options.minWidthAuto) {
				
				if (options.colratio.length == nbcol) {
					
					var minWidth =  $(this).width() + 'px';
					
				} else {
					
					var minWidth = (_initialWidth + 150) + 'px';
				}
			}
						
			_headerscontainer.children().first().css('min-width', minWidth);
			
			_body.children().first().css('min-width', minWidth);
			
			_body.scroll(function(){
				
				_headerscontainer[0].scrollLeft = _body[0].scrollLeft;
			});
			
			if (options.colratio.length == nbcol) {
								
				_wrapper.removeClass('default');
				
				$(_headers).css('width', getColratioWidth() + 'px');
			}
			//jce 3160408 added this to safely call this function to signify this file is done
			if(typeof fixheadertableIsDone !== 'undefined') {
				fixheadertableIsDone();
			}
		});
	};
	
})(jQuery);