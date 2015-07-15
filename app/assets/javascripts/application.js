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
//= require Chart
//= require angular/angular
//= require angular-chart.js/dist/angular-chart.js
//= require_tree .




var PoliticsApp = angular.module("PoliticsApp", ["chart.js"])
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
   // ChartJsProvider.setOptions({
   //    colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
   //    responsive: true
   //  });
    // Configure all line charts
  //   ChartJsProvider.setOptions('Line', {
  //     datasetFill: false
  //   });
  // }]).controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };

  // // Simulate async data update
  // $timeout(function () {
  //   $scope.data = [
  //     [28, 48, 40, 19, 86, 27, 90],
  //     [65, 59, 80, 81, 56, 55, 40]
  //   ];
  // }, 3000);
}]);

PoliticsApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.
        defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}])


PoliticsApp.controller('GraphCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
    $scope.politicianData = {
                                "name" : null
                                }
            
        $scope.data = null;
        $scope.total = null;
        $scope.labels = null;
        $scope.pacs = null;
        $scope.info = null;
        $scope.title = null

        
        $scope.getData = function() {
            var politicianInfo = {
                    name: $scope.politicianData.name
                   }
        //  // var electionCycle = "2014";
            $http.get("/contributions.json", {params:{"name": politicianInfo.name}}).success(function (res) {
                debugger
                $scope.data = [];
                $scope.labels = [];
                var data = res.data
                for (var i = 0; i < data.length; i++){
                    var name = data[i][0]
                    var amount = data[i][1]
                    console.log(name)
                    $scope.labels = $scope.labels.concat(name);
                    $scope.data = $scope.data.concat(amount);
                }
                $scope.allResults = res.data
                $http.get("/total.json", {params:{"name": politicianInfo.name}}).success(function (res) {
                    $scope.total = res.data.total
                    var totalMinusTopContributors = $scope.total;
                    for (var i = 0; i < $scope.data.length; i++) {
                        totalMinusTopContributors -= $scope.data[i]
                    }
                    $scope.labels = $scope.labels.concat("total")
                    $scope.data = $scope.data.concat(totalMinusTopContributors)
            
                })
                $http.get("/amount_from_pacs.json", {params:{"name": politicianInfo.name}}).success(function (res) {
                    debugger
                    $scope.info = [];
                    $scope.titles = [];
                    var data = res.data
                    for (var i = 0; i < data.length; i++){
                        var name = data[i][0]
                        var amount = data[i][1]
                        console.log(name)
                        $scope.titles = $scope.titles.concat(name);
                        $scope.info = $scope.info.concat(amount);
                    }

                    var totalMinusTopPacs = $scope.total;
                    for (var i = 0; i < $scope.info.length; i++) {
                        totalMinusTopPacs -= $scope.info[i]
                    }

                    $scope.titles = $scope.titles.concat("total")
                    $scope.info = $scope.info.concat(totalMinusPacs)
                })
                
                $scope.$on('create', function (event, chart) {
                    
                  console.log(chart);
                });

                
            });
        }


    $timeout(function () {
    }, 500);
}]);


