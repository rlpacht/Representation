// // TODO: try getting the more modular version of this to work
// var PoliticsApp = angular.module("PoliticsApp", ["chart.js", 'angularSpinner', "angucomplete-alt"])
// .config(['ChartJsProvider', function (ChartJsProvider) {
// }]);

// PoliticsApp.config(["$httpProvider", function ($httpProvider) {
//     $httpProvider.
//         defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
// }])



// PoliticsApp.controller('GraphCtrl', ['$scope', '$timeout', '$http', 'usSpinnerService', function ($scope, $timeout, $http, usSpinnerService) {

//     $scope.politicianList = [
//         {name: 'John Mccain'},
//         {name: 'Nancy Pelosi'},
//         {name: 'Ted Cruz'},
//         {name: 'Marco Rubio'},
//         {name: 'Charles E. Schumer'},
//         {name: 'Bernie Sanders'},
//         {name: 'John Boehner'},
//         {name: 'Matt Salmon'},
//         {name: 'Rick Crawford'},
//         {name: 'French Hill'},
//         {name: 'Steve Womack'},
//         {name: 'Barbara Lee'},
//         {name: 'Ted Yoho'},
//         {name: 'Pete King'},
//         {name: 'Tim Murphy'},
//         {name: 'Tom Rice'},
//         {name: 'Richard Shelby'},
//         {name: 'Rand Paul'},
//         {name: 'Barbara Boxer'},
//         {name: 'Dianne Feinstein'},
//         {name: 'Lindsey Graham'},
//         {name: 'Hillary Clinton'}
//         ];


//     $scope.politicianData = {
//                                 "name" : null,
//                                 "electionCycle" : null,
//                                 "limit": null
//                                 }
            
//         $scope.data = null;
//         $scope.total = null;
//         $scope.labels = null;
//         $scope.pacs = null;
//         $scope.info = null;
//         $scope.title = null;
//         $scope.gender_name = null;
//         $scope.gender_donation = null;
//         $scope.errorMessage = null;


//         $scope.startSpin = function(){
//                 usSpinnerService.spin('spinner-1');

//             }

//         $scope.inputChanged = function(str) {
//               $scope.politicianData.name = str;
//             }
        
//         $scope.getData = function() {
//             var politicianInfo = {
//                     name: $scope.politicianData.name.title,
//                     electionCycle: $scope.politicianData.electionCycle,
//                     limit: $scope.politicianData.limit
//                    }

//                    // if (politicianInfo.name.split(" ").length === 1 || politicianInfo.name === null) {
//                    //  $("#myAlert").alert()
//                    // }
//             $scope.startSpin();
//         //  // var electionCycle = "2014";
//             $http.get("/contributions.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res, status) {
//                 $scope.searchedPolitician = $scope.politicianData.name.title;
//                 if (status >= 300 || status < 200 || res.data.length === 0) {
//                     $scope.errorMessage = "Uh oh. Something seems to have gone wrong."
//                     debugger
//                     return
//                 }
//                 $scope.data = [];
//                 var resData = [];
//                 $scope.labels = [];
//                 var resLabels = [];
//                 var data = res.data
//                 for (var i = 0; i < data.length; i++){
//                     var name = data[i][0]
//                     var amount = data[i][1]
//                     console.log(name)
//                     resLabels = resLabels.concat(name);
//                     resData = resData.concat(amount);
//                 }
//                 // .error(function (data) {
//                 //     $().alert(data)
//                 // })

//                 $scope.allResults = res.data
//                 $http.get("/total.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res) {
//                     $scope.total = res.data.total
//                     var totalMinusTopContributors = $scope.total;
//                     for (var i = 0; i < resData.length; i++) {
//                         totalMinusTopContributors -= resData[i]
//                     }
//                     $scope.labels = resLabels.concat("Remainder")
//                     $scope.data = resData.concat(totalMinusTopContributors)
            
//                 })

//                 // This method displays two totals because I am adding it twice
//                 // once after subtracting pac contributions
//                 // and again when I concat $scope.data because it already contains a total
//                 $http.get("/amount_from_pacs.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res) {
//                     $scope.info = [];
//                     $scope.titles = [];
//                     var data = res.data
//                     for (var i = 0; i < data.length; i++){
//                         var name = data[i][0]
//                         var amount = data[i][1]
//                         console.log(name)
//                         $scope.titles = $scope.titles.concat(name);
//                         $scope.info = $scope.info.concat(amount);
//                     }

//                     var totalMinusTopPacs = $scope.total;
//                     for (var i = 0; i < $scope.info.length; i++) {
//                         totalMinusTopPacs -= $scope.info[i]
//                     }

//                     $scope.titles = $scope.titles.concat("Remainder")
//                     $scope.titles = $scope.titles.concat(resLabels)
//                     $scope.info = $scope.info.concat(totalMinusTopPacs)
//                     $scope.info = $scope.info.concat(resData)

//                 })

//                 $http.get("/gender_contributions.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res) {
//                     var data = res.data;
//                     $scope.gender_donation = [];
//                     $scope.gender_name = [];
//                     var data = res.data
//                     var gender_total = 0;
//                     for (var i = 0; i < data.length; i++){
//                         $scope.gender_donation = $scope.gender_donation.concat(data[i]);
//                         gender_total += data[i]
//                     }
//                     $scope.gender_name = $scope.gender_name.concat("Women");        
//                     $scope.gender_name = $scope.gender_name.concat("Men");
                    
                    

//                     var totalMinusGender = $scope.total - gender_total;
//                     $scope.gender_name = $scope.gender_name.concat("Unspecified")
//                     $scope.gender_donation = $scope.gender_donation.concat(totalMinusGender)
//                     $scope.stopSpin();
//                 })
                
//                 $scope.$on('create', function (event, chart) {
                    
//                   console.log(chart);
//                 });

//                 $scope.stopSpin = function(){
//                     usSpinnerService.stop('spinner-1');
//                 }

                
//             });
//         }


//     $timeout(function () {
//     }, 500);
// }]);


// // PoliticsApp.controller('MainCtrl', function($scope) {
// //     $scope.politicianData = {
// //                 "name" : null
// //                 }
            
// //     $scope.data = null;
// //     $scope.total = null;
// //     $scope.labels = null;
// //     $scope.pacs = null;
// //     $scope.info = null;
// //     $scope.title = null;
// //     $scope.getData = null;
// // })


// // PoliticsApp.controller('ContribitionInfoCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
// //     $scope.getData = function() {
// //         var politicianInfo = {
// //                 name: $scope.politicianData.name
// //                }
// //     //  // var electionCycle = "2014";
// //         $http.get("/contributions.json", {params:{"name": politicianInfo.name}}).success(function (res) {
// //             debugger
// //             $scope.data = [];
// //             $scope.labels = [];
// //             var data = res.data
// //             for (var i = 0; i < data.length; i++){
// //                 var name = data[i][0]
// //                 var amount = data[i][1]
// //                 console.log(name)
// //                 $scope.labels = $scope.labels.concat(name);
// //                 $scope.data = $scope.data.concat(amount);
// //             }

// //             $scope.allResults = res.data
// //             $http.get("/total.json", {params:{"name": politicianInfo.name}}).success(function (res) {
// //                 $scope.total = res.data.total
// //                 var totalMinusTopContributors = $scope.total;
// //                 for (var i = 0; i < $scope.data.length; i++) {
// //                     totalMinusTopContributors -= $scope.data[i]
// //                 }
// //                 $scope.labels = $scope.labels.concat("TOTAL")
// //                 $scope.data = $scope.data.concat(totalMinusTopContributors)
        
// //             })
            
            
// //             $scope.$on('create', function (event, chart) {
                
// //               console.log(chart);
// //             });

            
// //         });
// //     }


// //     $timeout(function () {
// //     }, 500);
// // }]);


// // PoliticsApp.controller('PacInfoCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
// //     $scope.sendData = function() {
// //         $http.get("/amount_from_pacs.json", {params:{"name": politicianInfo.name}}).success(function (res) {
// //             debugger
// //             $scope.info = [];
// //             $scope.titles = [];
// //             var data = res.data
// //             for (var i = 0; i < data.length; i++){
// //                 var name = data[i][0]
// //                 var amount = data[i][1]
// //                 console.log(name)
// //                 $scope.titles = $scope.titles.concat(name);
// //                 $scope.info = $scope.info.concat(amount);
// //             }

// //             var totalMinusTopPacs = $scope.total;
// //             for (var i = 0; i < $scope.info.length; i++) {
// //                 totalMinusTopPacs -= $scope.info[i]
// //             }

// //             $scope.titles = $scope.titles.concat("TOTAL")
// //             $scope.titles = $scope.titles.concat($scope.labels)
// //             $scope.info = $scope.info.concat(totalMinusTopPacs)
// //             $scope.info = $scope.info.concat($scope.data)

//             // $scope.$on('create', function (event, chart) {
//             //   console.log(chart);
//             // });
// //         })  
// //     }
    
// // }]);




