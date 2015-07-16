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
//= require spin.js/spin.js
//= require angular-spinner/angular-spinner.js
//= require_tree .



// TODO: try getting the more modular version of this to work
var PoliticsApp = angular.module("PoliticsApp", ["chart.js", 'angularSpinner'])
.config(['ChartJsProvider', function (ChartJsProvider) {
}]);

PoliticsApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.
        defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}])


PoliticsApp.controller('GraphCtrl', ['$scope', '$timeout', '$http', 'usSpinnerService', function ($scope, $timeout, $http, usSpinnerService) {
    $scope.politicianData = {
                                "name" : null,
                                "electionCycle" : null
                                }
            
        $scope.data = null;
        $scope.total = null;
        $scope.labels = null;
        $scope.pacs = null;
        $scope.info = null;
        $scope.title = null;
        $scope.gender_name = null;
        $scope.gender_donation = null;


        $scope.startSpin = function(){
                usSpinnerService.spin('spinner-1');

            }
        
        $scope.getData = function() {

            var politicianInfo = {
                    name: $scope.politicianData.name,
                    electionCycle: $scope.politicianData.electionCycle
                   }
            $scope.startSpin();
        //  // var electionCycle = "2014";
            $http.get("/contributions.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle}}).success(function (res) {
                $scope.data = [];
                var resData = [];
                $scope.labels = [];
                var resLabels = [];
                var data = res.data
                for (var i = 0; i < data.length; i++){
                    var name = data[i][0]
                    var amount = data[i][1]
                    console.log(name)
                    resLabels = resLabels.concat(name);
                    resData = resData.concat(amount);
                }

                $scope.allResults = res.data
                $http.get("/total.json", {params:{"name": politicianInfo.name}}).success(function (res) {
                    $scope.total = res.data.total
                    var totalMinusTopContributors = $scope.total;
                    for (var i = 0; i < resData.length; i++) {
                        totalMinusTopContributors -= resData[i]
                    }
                    $scope.labels = resLabels.concat("Remainder")
                    $scope.data = resData.concat(totalMinusTopContributors)
            
                })

                // This method displays two totals because I am adding it twice
                // once after subtracting pac contributions
                // and again when I concat $scope.data because it already contains a total
                $http.get("/amount_from_pacs.json", {params:{"name": politicianInfo.name}}).success(function (res) {
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

                    $scope.titles = $scope.titles.concat("Remainder")
                    $scope.titles = $scope.titles.concat(resLabels)
                    $scope.info = $scope.info.concat(totalMinusTopPacs)
                    $scope.info = $scope.info.concat(resData)

                })

                $http.get("/gender_contributions.json", {params:{"name": politicianInfo.name}}).success(function (res) {
                    var data = res.data;
                    $scope.gender_donation = [];
                    $scope.gender_name = [];
                    var data = res.data
                    var gender_total = 0;
                    for (var i = 0; i < data.length; i++){
                        $scope.gender_donation = $scope.gender_donation.concat(data[i]);
                        gender_total += data[i]
                    }
                    $scope.gender_name = $scope.gender_name.concat("Women");        
                    $scope.gender_name = $scope.gender_name.concat("Men");
                    
                    

                    var totalMinusGender = $scope.total - gender_total;
                    $scope.gender_name = $scope.gender_name.concat("Unspecified")
                    $scope.gender_donation = $scope.gender_donation.concat(totalMinusGender)
                    $scope.stopSpin();
                })
                
                $scope.$on('create', function (event, chart) {
                    
                  console.log(chart);
                });

                $scope.stopSpin = function(){
                    usSpinnerService.stop('spinner-1');
                }

                
            });
        }


    $timeout(function () {
    }, 500);
}]);


// PoliticsApp.controller('MainCtrl', function($scope) {
//     $scope.politicianData = {
//                 "name" : null
//                 }
            
//     $scope.data = null;
//     $scope.total = null;
//     $scope.labels = null;
//     $scope.pacs = null;
//     $scope.info = null;
//     $scope.title = null;
//     $scope.getData = null;
// })


// PoliticsApp.controller('ContribitionInfoCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
//     $scope.getData = function() {
//         var politicianInfo = {
//                 name: $scope.politicianData.name
//                }
//     //  // var electionCycle = "2014";
//         $http.get("/contributions.json", {params:{"name": politicianInfo.name}}).success(function (res) {
//             debugger
//             $scope.data = [];
//             $scope.labels = [];
//             var data = res.data
//             for (var i = 0; i < data.length; i++){
//                 var name = data[i][0]
//                 var amount = data[i][1]
//                 console.log(name)
//                 $scope.labels = $scope.labels.concat(name);
//                 $scope.data = $scope.data.concat(amount);
//             }

//             $scope.allResults = res.data
//             $http.get("/total.json", {params:{"name": politicianInfo.name}}).success(function (res) {
//                 $scope.total = res.data.total
//                 var totalMinusTopContributors = $scope.total;
//                 for (var i = 0; i < $scope.data.length; i++) {
//                     totalMinusTopContributors -= $scope.data[i]
//                 }
//                 $scope.labels = $scope.labels.concat("TOTAL")
//                 $scope.data = $scope.data.concat(totalMinusTopContributors)
        
//             })
            
            
//             $scope.$on('create', function (event, chart) {
                
//               console.log(chart);
//             });

            
//         });
//     }


//     $timeout(function () {
//     }, 500);
// }]);


// PoliticsApp.controller('PacInfoCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
//     $scope.sendData = function() {
//         $http.get("/amount_from_pacs.json", {params:{"name": politicianInfo.name}}).success(function (res) {
//             debugger
//             $scope.info = [];
//             $scope.titles = [];
//             var data = res.data
//             for (var i = 0; i < data.length; i++){
//                 var name = data[i][0]
//                 var amount = data[i][1]
//                 console.log(name)
//                 $scope.titles = $scope.titles.concat(name);
//                 $scope.info = $scope.info.concat(amount);
//             }

//             var totalMinusTopPacs = $scope.total;
//             for (var i = 0; i < $scope.info.length; i++) {
//                 totalMinusTopPacs -= $scope.info[i]
//             }

//             $scope.titles = $scope.titles.concat("TOTAL")
//             $scope.titles = $scope.titles.concat($scope.labels)
//             $scope.info = $scope.info.concat(totalMinusTopPacs)
//             $scope.info = $scope.info.concat($scope.data)

            // $scope.$on('create', function (event, chart) {
            //   console.log(chart);
            // });
//         })  
//     }
    
// }]);




