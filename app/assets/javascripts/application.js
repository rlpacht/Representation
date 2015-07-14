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

var PoliticsApp = angular.module("PoliticsApp", [])

PoliticsApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.
        defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}])

// angular.module('PoliticsApp.controllers').
// 		controller('MainCtrl', ['$scope', '$http', function($scope, $http){
// 		$scope.politicianData = {
// 								"name" : null
// 								}
	    	
// 	    $scope.data = null;
	    
// 	    $scope.getData = function() {
// 	    	var politicianInfo = {
// 	    					name: $scope.politicianData.name
// 	    	}
// 	    	// var electionCycle = "2014";
// 	    	$http.get("/data.json", {params:{"name": politicianInfo.name}}).success(function (res) {
// 	    		var data = JSON.parse(res.data)
// 	    		$scope.data = data[1];
	    	
// 	    	});

// 	    }		

// }])


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
    	$http.get("/contributions.json", {params:{"name": politicianInfo.name}}).success(function (res) {
    		debugger
    		$scope.data = res.data;
    	
    	});

        // for (var key in validation_messages) {
        //    if (validation_messages.hasOwnProperty(key)) {
        //        var obj = validation_messages[key];
        //         for (var prop in obj) {
        //           // important check that this is objects own property 
        //           // not from prototype prop inherited
        //           if(obj.hasOwnProperty(prop)){
        //             alert(prop + " = " + obj[prop]);
        //           }
        //        }
        //     }
        // }

    }
	
});

// PoliticsApp.directive("treeStructure", function ($window) {
// 	return{
// 		restrict: "EA",
// 		template: "<svg></svg>",
// 		link: function(scope, elem, attrs){
// 			var dataToShow = scope[attrs.chartData];

// 			var i = 0,
// 			    duration = 750,
// 			    root;

// 			var margin = {top: 20, right: 120, bottom: 20, left: 120},
// 					    width = 960 - margin.right - margin.left,
// 					    height = 800 - margin.top - margin.bottom;

// 			var d3 = $window.d3;
// 			var rawSvg = elem.find("svg")[0];
// 			var svg = d3.select(rawSvg);

// 			var tree = d3.layout.tree()
// 			    .size([height, width]);

// 			var diagonal = d3.svg.diagonal()
// 			    .projection(function(d) { return [d.y, d.x]; });

// 			var svg = d3.select("svg")
// 			    .attr("width", width + margin.right + margin.left)
// 			    .attr("height", height + margin.top + margin.bottom)
// 			  .append("g")
// 			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 			d3.json("/data.json", function (error, res) {
// 					var politician  = JSON.parse(res.data)
// 					if (error) throw error;
// 					debugger
// 					root = politician;
// 					root.x0 = height / 2;
// 					root.y0 = 0;

// 					function collapse(d) {
// 						if (d.children) {
// 					    	d._children = d.children;
// 					    	d._children.forEach(collapse);
// 					    	d.children = null;
// 					  	}
// 					}
// 					root.forEach(collapse);
// 					update(root);
// 				});

// 				d3.select(self.frameElement).style("height", "800px");

// 				function update(source) {

// 				  // Compute the new tree layout.
// 				  var nodes = tree.nodes(root).reverse(),
// 				      links = tree.links(nodes);

// 				  // Normalize for fixed-depth.
// 				  nodes.forEach(function(d) { d.y = d.depth * 180; });
// 				  	// Update the nodes…
// 				  	  var node = svg.selectAll("g.node")
// 				  	      .data(nodes, function(d) { return d.id || (d.id = ++i); });

// 				  	  // Enter any new nodes at the parent's previous position.
// 				  	  var nodeEnter = node.enter().append("g")
// 				  	      .attr("class", "node")
// 				  	      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
// 				  	      .on("click", click);

// 				  	  nodeEnter.append("circle")
// 				  	      .attr("r", 1e-6)
// 				  	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

// 				  	  nodeEnter.append("text")
// 				  	      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
// 				  	      .attr("dy", ".35em")
// 				  	      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
// 				  	      .text(function(d) { return d.name; })
// 				  	      .style("fill-opacity", 1e-6);

// 				  	  // Transition nodes to their new position.
// 				  	  var nodeUpdate = node.transition()
// 				  	      .duration(duration)
// 				  	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

// 				  	  nodeUpdate.select("circle")
// 				  	      .attr("r", 4.5)
// 				  	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

// 				  	  nodeUpdate.select("text")
// 				  	      .style("fill-opacity", 1);

// 				  	  // Transition exiting nodes to the parent's new position.
// 				  	  var nodeExit = node.exit().transition()
// 				  	      .duration(duration)
// 				  	      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
// 				  	      .remove();

// 				  	  nodeExit.select("circle")
// 				  	      .attr("r", 1e-6);

// 				  	  nodeExit.select("text")
// 				  	      .style("fill-opacity", 1e-6);

// 				  	  // Update the links…
// 				  	  var link = svg.selectAll("path.link")
// 				  	      .data(links, function(d) { return d.target.id; });

// 				  	  // Enter any new links at the parent's previous position.
// 				  	  link.enter().insert("path", "g")
// 				  	      .attr("class", "link")
// 				  	      .attr("d", function(d) {
// 				  	        var o = {x: source.x0, y: source.y0};
// 				  	        return diagonal({source: o, target: o});
// 				  	      });

// 				  	  // Transition links to their new position.
// 				  	  link.transition()
// 				  	      .duration(duration)
// 				  	      .attr("d", diagonal);

// 				  	  // Transition exiting nodes to the parent's new position.
// 				  	  link.exit().transition()
// 				  	      .duration(duration)
// 				  	      .attr("d", function(d) {
// 				  	        var o = {x: source.x, y: source.y};
// 				  	        return diagonal({source: o, target: o});
// 				  	      })
// 				  	      .remove();

// 				  	  // Stash the old positions for transition.
// 				  	  nodes.forEach(function(d) {
// 				  	    d.x0 = d.x;
// 				  	    d.y0 = d.y;
// 				  	  });
// 				  	}

// 				  	// Toggle children on click.
// 				  	function click(d) {
// 				  	  if (d.children) {
// 				  	    d._children = d.children;
// 				  	    d.children = null;
// 				  	  } else {
// 				  	    d.children = d._children;
// 				  	    d._children = null;
// 				  	  }
// 				  	  update(d);
// 				  	}
// 			return d3		 
// 		}
// 	};
// });
