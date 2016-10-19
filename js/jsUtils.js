//Just add the code to be able to inherit here, and import the variable in the code to use and bam, there it is

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

module.exports = Array;
