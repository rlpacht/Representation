// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require angular/angular 
//= require_tree .

// var width = 400, height = 400; 
//             var svg = d3.select("body").append("svg")
//                                         .attr("width", width)
//                                         .attr("height", height)
//                                         .append("g")


// angular.module('d3', [])
// 	.factory('d3Service', [function() {
// 		var d3;
// 		var margin = {top: 20, right: 120, bottom: 20, left: 120},
// 		    width = 960 - margin.right - margin.left,
// 		    height = 800 - margin.top - margin.bottom;

// 		var i = 0,
// 		    duration = 750,
// 		    root;

// 		var tree = d3.layout.tree()
// 		    .size([height, width]);

// 		var diagonal = d3.svg.diagonal()
// 		    .projection(function(d) { return [d.y, d.x]; });

// 		var svg = d3.select("body").append("svg")
// 		    .attr("width", width + margin.right + margin.left)
// 		    .attr("height", height + margin.top + margin.bottom)
// 		  .append("g")
// 		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 		d3.json($scope.data, function (error, politician) {
// 			if (error) throw error;
// 			root = politician;
// 			root.x0 = height / 2;
// 			root.y0 = 0;

// 			function collapse(d) {
// 				if (d.children) {
// 			    	d._children = d.children;
// 			    	d._children.forEach(collapse);
// 			    	d.children = null;
// 			  	}
// 			}
// 			root.children.forEach(collapse);
// 			update(root);
// 		});

// 		// d3.json("/mbostock/raw/4063550/flare.json", function(error, flare) {
// 		//   if (error) throw error;

// 		//   root = flare;
// 		//   root.x0 = height / 2;
// 		//   root.y0 = 0;

// 		//   function collapse(d) {
// 		//     if (d.children) {
// 		//       d._children = d.children;
// 		//       d._children.forEach(collapse);
// 		//       d.children = null;
// 		//     }
// 		//   }

// 		//   root.children.forEach(collapse);
// 		//   update(root);
// 		// });

// 		d3.select(self.frameElement).style("height", "800px");

// 		function update(source) {

// 		  // Compute the new tree layout.
// 		  var nodes = tree.nodes(root).reverse(),
// 		      links = tree.links(nodes);

// 		  // Normalize for fixed-depth.
// 		  nodes.forEach(function(d) { d.y = d.depth * 180; });

// 		return d3;

// }]);


var PoliticsApp = angular.module("PoliticsApp", [])

PoliticsApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.
        defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}])


PoliticsApp.controller("MainCtrl", function ($scope, $http) {

	$scope.politicianData = {
							"name" : null
							}
    	
    $scope.data = null;
    
    $scope.getData = function() {
    	var politicianInfo = {
    					name: $scope.politicianData.name
    	}
    	// var electionCycle = "2014";
    	$http.get("/data.json", {params:{"name": politicianInfo.name}}).success(function (res) {
    		var data = JSON.parse(res.data)
    		$scope.data = data[1];
    	
    	});

    }
	
});

// PoliticsApp.directive('ghVisualization', function() {
	
// })




