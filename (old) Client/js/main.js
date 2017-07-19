var createCircle = function(id, data, primary, secondary) {
	var ctx = document.getElementById(id).getContext('2d');
	data = {
		datasets: [{
			data: [100 - data, data],
			backgroundColor: ['white', primary],
			hoverBackgroundColor: ['white', secondary],
			hoverBorderColor: ['white', '#e6e6e6']
		}],
	};
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.maintainAspectRatio = false;
  Chart.defaults.global.tooltips.enabled = false;
	var myDoughnutChart = new Chart(ctx, {
	  type: 'doughnut',
	  data: data,
	  options: Chart.defaults.doughnut
	});
};


var run = function(object) {
	var x = 0;
	//console.log(object[0])
	while (x < object.length) {
		createCircle(object[x].name,object[x].percentage, object[x].primary, object[x].secondary);
		x++;
	}
}

var big5 = [
	{name: 'openness', percentage: 67, primary: '#6699ff', secondary: '#1a66ff'}
]

run(big5);