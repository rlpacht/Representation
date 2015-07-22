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
//= require bootstrap/dist/js/bootstrap.min.js
//= require Chart
//= require angular/angular
//= require angular-chart.js/dist/angular-chart.js
//= require spin.js/spin.js
//= require angular-spinner/angular-spinner.js
//= require angucomplete-alt/angucomplete-alt.js
//= require_tree .



// TODO: try getting the more modular version of this to work
var PoliticsApp = angular.module("PoliticsApp", ["chart.js", 'angularSpinner', "angucomplete-alt"])
.config(['ChartJsProvider', function (ChartJsProvider) {
}]);

PoliticsApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.
        defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}])



PoliticsApp.controller('GraphCtrl', ['$scope', '$timeout', '$http', 'usSpinnerService', function ($scope, $timeout, $http, usSpinnerService) {
    $scope.searchedPolitician = null;

    $scope.congress113 = [
      {"name": "John Conyers"},
      {"name": "Charles Rangel"},
      {"name": "Don Young"},
      {"name": "James Sensenbrenner"},
      {"name": "Hal Rogers"},
      {"name": "Christopher Smith"},
      {"name": "Steny Hoyer"},
      {"name": "Marcy Kaptur"},
      {"name": "Sander Levin"},
      {"name": "Joe Barton"},
      {"name": "Pete Visclosky"},
      {"name": "Peter DeFazio"},
      {"name": "John Lewis"},
      {"name": "Louise Slaughter"},
      {"name": "Lamar Smith"},
      {"name": "Fred Upton"},
      {"name": "Nancy Pelosi"},
      {"name": "John Duncan"},
      {"name": "Frank Pallone"},
      {"name": "Eliot Engel"},
      {"name": "Nita Lowey"},
      {"name": "Jim McDermott"},
      {"name": "Richard Neal"},
      {"name": "Dana Rohrabacher"},
      {"name": "Ileana Ros-Lehtinen"},
      {"name": "José Serrano"},
      {"name": "David Price"},
      {"name": "John Boehner"},
      {"name": "Rosa DeLauro"},
      {"name": "Collin Peterson"},
      {"name": "Maxine Waters"},
      {"name": "Sam Johnson"},
      {"name": "Jerrold Nadler"},
      {"name": "Jim Cooper"},
      {"name": "Xavier Becerra"},
      {"name": "Sanford Bishop"},
      {"name": "Corrine Brown"},
      {"name": "Ken Calvert"},
      {"name": "Jim Clyburn"},
      {"name": "Anna Eshoo"},
      {"name": "Bob Goodlatte"},
      {"name": "Gene Green"},
      {"name": "Luis Gutiérrez"},
      {"name": "Alcee Hastings"},
      {"name": "Eddie Bernice Johnson"},
      {"name": "Peter King"},
      {"name": "Carolyn Maloney"},
      {"name": "John Mica"},
      {"name": "Lucille Roybal-Allard"},
      {"name": "Ed Royce"},
      {"name": "Bobby Rush"},
      {"name": "Bobby Scott"},
      {"name": "Nydia Velázquez"},
      {"name": "Bennie Thompson"},
      {"name": "Sam Farr"},
      {"name": "Frank Lucas"},
      {"name": "Lloyd Doggett"},
      {"name": "Mike Doyle"},
      {"name": "Chaka Fattah"},
      {"name": "Rodney Frelinghuysen"},
      {"name": "Sheila Jackson-Lee"},
      {"name": "Walter B. Jones"},
      {"name": "Frank LoBiondo"},
      {"name": "Zoe Lofgren"},
      {"name": "Mac Thornberry"},
      {"name": "Ed Whitfield"},
      {"name": "Elijah Cummings"},
      {"name": "Earl Blumenauer"},
      {"name": "Robert Aderholt"},
      {"name": "Kevin Brady"},
      {"name": "Danny Davis"},
      {"name": "Diana DeGette"},
      {"name": "Kay Granger"},
      {"name": "Rubén Hinojosa"},
      {"name": "Ron Kind"},
      {"name": "Jim McGovern"},
      {"name": "Bill Pascrell"},
      {"name": "Joe Pitts"},
      {"name": "Loretta Sanchez"},
      {"name": "Pete Sessions"},
      {"name": "Brad Sherman"},
      {"name": "John Shimkus"},
      {"name": "Adam Smith"},
      {"name": "Gregory Meeks"},
      {"name": "Lois Capps"},
      {"name": "Barbara Lee"},
      {"name": "Robert Brady"},
      {"name": "Steve Chabot"},
      {"name": "Mike Capuano"},
      {"name": "Joe Crowley"},
      {"name": "John Larson"},
      {"name": "Grace Napolitano"},
      {"name": "Paul Ryan"},
      {"name": "Jan Schakowsky"},
      {"name": "Mike Simpson"},
      {"name": "Mike Thompson"},
      {"name": "Greg Walden"},
      {"name": "William Lacy Clay"},
      {"name": "Ander Crenshaw"},
      {"name": "John Culberson"},
      {"name": "Susan Davis"},
      {"name": "Sam Graves"},
      {"name": "Mike Honda"},
      {"name": "Steve Israel"},
      {"name": "Darrell Issa"},
      {"name": "James Langevin"},
      {"name": "Rick Larsen"},
      {"name": "Betty McCollum"},
      {"name": "Adam Schiff"},
      {"name": "Patrick Tiberi"},
      {"name": "Bill Shuster"},
      {"name": "Randy Forbes"},
      {"name": "Stephen Lynch"},
      {"name": "Jeff Miller"},
      {"name": "Joe Wilson"},
      {"name": "Rob Bishop"},
      {"name": "Marsha Blackburn"},
      {"name": "Michael Burgess"},
      {"name": "John Carter"},
      {"name": "Tom Cole"},
      {"name": "Mario Diaz-Balart"},
      {"name": "Trent Franks"},
      {"name": "Scott Garrett"},
      {"name": "Raúl Grijalva"},
      {"name": "Jeb Hensarling"},
      {"name": "Steve King"},
      {"name": "John Kline"},
      {"name": "Candice Miller"},
      {"name": "Tim Murphy"},
      {"name": "Devin Nunes"},
      {"name": "Mike D. Rogers"},
      {"name": "Dutch Ruppersberger"},
      {"name": "Tim Ryan"},
      {"name": "Linda Sánchez"},
      {"name": "David Scott"},
      {"name": "Michael Turner"},
      {"name": "Chris Van Hollen"},
      {"name": "Randy Neugebauer"},
      {"name": "G. K. Butterfield"},
      {"name": "Charles Boustany"},
      {"name": "Emanuel Cleaver"},
      {"name": "Mike Conaway"},
      {"name": "Jim Costa"},
      {"name": "Henry Cuellar"},
      {"name": "Charlie Dent"},
      {"name": "Jeff Fortenberry"},
      {"name": "Virginia Foxx"},
      {"name": "Louie Gohmert"},
      {"name": "Al Green"},
      {"name": "Brian Higgins"},
      {"name": "Dan Lipinski"},
      {"name": "Kenny Marchant"},
      {"name": "Michael McCaul"},
      {"name": "Patrick McHenry"},
      {"name": "Cathy McMorris Rodgers"},
      {"name": "Gwen Moore"},
      {"name": "Ted Poe"},
      {"name": "Tom Price"},
      {"name": "Dave Reichert"},
      {"name": "Debbie Wasserman Schultz"},
      {"name": "Lynn Westmoreland"},
      {"name": "Doris Matsui"},
      {"name": "Albio Sires"},
      {"name": "Steve Pearce"},
      {"name": "Gus Bilirakis"},
      {"name": "Vern Buchanan"},
      {"name": "Kathy Castor"},
      {"name": "Yvette D. Clarke"},
      {"name": "Steve Cohen"},
      {"name": "Joe Courtney"},
      {"name": "Keith Ellison"},
      {"name": "Hank Johnson"},
      {"name": "Jim Jordan"},
      {"name": "Doug Lamborn"},
      {"name": "Dave Loebsack"},
      {"name": "Kevin McCarthy"},
      {"name": "Jerry McNerney"},
      {"name": "Ed Perlmutter"},
      {"name": "Peter Roskam"},
      {"name": "John Sarbanes"},
      {"name": "Adrian Smith"},
      {"name": "Tim Walz"},
      {"name": "Peter Welch"},
      {"name": "John Yarmuth"},
      {"name": "Niki Tsongas"},
      {"name": "Bob Latta"},
      {"name": "Rob Wittman"},
      {"name": "André Carson"},
      {"name": "Jackie Speier"},
      {"name": "Steve Scalise"},
      {"name": "Donna Edwards"},
      {"name": "Marcia Fudge"},
      {"name": "Rick Nolan"},
      {"name": "Matt Salmon"},
      {"name": "Mark Sanford"},
      {"name": "Jason Chaffetz"},
      {"name": "Mike Coffman"},
      {"name": "Gerry Connolly"},
      {"name": "John C. Fleming"},
      {"name": "Brett Guthrie"},
      {"name": "Gregg Harper"},
      {"name": "Jim Himes"},
      {"name": "Duncan D. Hunter"},
      {"name": "Lynn Jenkins"},
      {"name": "Leonard Lance"},
      {"name": "Blaine Luetkemeyer"},
      {"name": "Ben R. Luján"},
      {"name": "Cynthia Lummis"},
      {"name": "Tom McClintock"},
      {"name": "Pete Olson"},
      {"name": "Erik Paulsen"},
      {"name": "Chellie Pingree"},
      {"name": "Jared Polis"},
      {"name": "Bill Posey"},
      {"name": "Phil Roe"},
      {"name": "Tom Rooney"},
      {"name": "Kurt Schrader"},
      {"name": "Glenn Thompson"},
      {"name": "Paul Tonko"},
      {"name": "Michael Quigley"},
      {"name": "Judy Chu"},
      {"name": "John Garamendi"},
      {"name": "Ted Deutch"},
      {"name": "Tom Graves"},
      {"name": "Tom Reed"},
      {"name": "Marlin Stutzman"},
      {"name": "Mike Fitzpatrick"},
      {"name": "Tim Walberg"},
      {"name": "Bill Foster"},
      {"name": "Justin Amash"},
      {"name": "Lou Barletta"},
      {"name": "Karen Bass"},
      {"name": "Dan Benishek"},
      {"name": "Diane Black"},
      {"name": "Mo Brooks"},
      {"name": "Larry Bucshon"},
      {"name": "John Carney"},
      {"name": "David Cicilline"},
      {"name": "Rick Crawford"},
      {"name": "Jeff Denham"},
      {"name": "Scott DesJarlais"},
      {"name": "Sean Duffy"},
      {"name": "Jeff Duncan"},
      {"name": "Renee Ellmers"},
      {"name": "Blake Farenthold"},
      {"name": "Stephen Fincher"},
      {"name": "Chuck Fleischmann"},
      {"name": "Bill Flores"},
      {"name": "Bob Gibbs"},
      {"name": "Chris Gibson"},
      {"name": "Paul Gosar"},
      {"name": "Trey Gowdy"},
      {"name": "Morgan Griffith"},
      {"name": "Richard Hanna"},
      {"name": "Andy Harris"},
      {"name": "Vicky Hartzler"},
      {"name": "Joe Heck"},
      {"name": "Jaime Herrera Beutler"},
      {"name": "Tim Huelskamp"},
      {"name": "Bill Huizenga"},
      {"name": "Randy Hultgren"},
      {"name": "Robert Hurt"},
      {"name": "Bill Johnson"},
      {"name": "Bill Keating"},
      {"name": "Mike Kelly"},
      {"name": "Adam Kinzinger"},
      {"name": "Raúl Labrador"},
      {"name": "Billy Long"},
      {"name": "Tom Marino"},
      {"name": "David McKinley"},
      {"name": "Pat Meehan"},
      {"name": "Mick Mulvaney"},
      {"name": "Kristi Noem"},
      {"name": "Rich Nugent"},
      {"name": "Steven Palazzo"},
      {"name": "Mike Pompeo"},
      {"name": "Jim Renacci"},
      {"name": "Reid Ribble"},
      {"name": "Cedric Richmond"},
      {"name": "Scott Rigell"},
      {"name": "Martha Roby"},
      {"name": "Todd Rokita"},
      {"name": "Dennis Ross"},
      {"name": "David Schweikert"},
      {"name": "Austin Scott"},
      {"name": "Terri Sewell"},
      {"name": "Steve Stivers"},
      {"name": "Scott Tipton"},
      {"name": "Daniel Webster"},
      {"name": "Frederica Wilson"},
      {"name": "Steve Womack"},
      {"name": "Rob Woodall"},
      {"name": "Kevin Yoder"},
      {"name": "Todd Young"},
      {"name": "Janice Hahn"},
      {"name": "Mark Amodei"},
      {"name": "Suzanne Bonamici"},
      {"name": "Suzan DelBene"},
      {"name": "Thomas Massie"},
      {"name": "Donald Payne, Jr."},
      {"name": "Alan Grayson"},
      {"name": "Ann Kirkpatrick"},
      {"name": "Dina Titus"},
      {"name": "Andy Barr"},
      {"name": "Joyce Beatty"},
      {"name": "Ami Bera"},
      {"name": "Jim Bridenstine"},
      {"name": "Susan Brooks"},
      {"name": "Julia Brownley"},
      {"name": "Cheri Bustos"},
      {"name": "Tony Cardenas"},
      {"name": "Matt Cartwright"},
      {"name": "Joaquin Castro"},
      {"name": "Chris Collins"},
      {"name": "Doug Collins"},
      {"name": "Paul Cook"},
      {"name": "Kevin Cramer"},
      {"name": "Rodney Davis"},
      {"name": "John Delaney"},
      {"name": "Ron DeSantis"},
      {"name": "Tammy Duckworth"},
      {"name": "Elizabeth Esty"},
      {"name": "Lois Frankel"},
      {"name": "Tulsi Gabbard"},
      {"name": "Dennis Heck"},
      {"name": "George Holding"},
      {"name": "Richard Hudson"},
      {"name": "Jared Huffman"},
      {"name": "Hakeem Jeffries"},
      {"name": "David Joyce"},
      {"name": "Joseph Kennedy III"},
      {"name": "Dan Kildee"},
      {"name": "Derek Kilmer"},
      {"name": "Ann McLane Kuster"},
      {"name": "Doug LaMalfa"},
      {"name": "Alan Lowenthal"},
      {"name": "Michelle Lujan Grisham"},
      {"name": "Sean Patrick Maloney"},
      {"name": "Mark Meadows"},
      {"name": "Grace Meng"},
      {"name": "Luke Messer"},
      {"name": "Markwayne Mullin"},
      {"name": "Patrick Murphy"},
      {"name": "Beto O'Rourke"},
      {"name": "Scott Perry"},
      {"name": "Scott Peters"},
      {"name": "Robert Pittenger"},
      {"name": "Mark Pocan"},
      {"name": "Tom Rice"},
      {"name": "Keith Rothfus"},
      {"name": "Raul Ruiz"},
      {"name": "Kyrsten Sinema"},
      {"name": "Chris Stewart"},
      {"name": "Eric Swalwell"},
      {"name": "Mark Takano"},
      {"name": "David Valadao"},
      {"name": "Juan Vargas"},
      {"name": "Marc Veasey"},
      {"name": "Filemon Vela"},
      {"name": "Ann Wagner"},
      {"name": "Jackie Walorski"},
      {"name": "Randy Weber"},
      {"name": "Brad Wenstrup"},
      {"name": "Roger Williams"},
      {"name": "Ted Yoho"},
      {"name": "Robin Kelly"},
      {"name": "Jason Smith"},
      {"name": "Katherine Clark"},
      {"name": "Bradley Byrne"},
      {"name": "David Jolly"},
      {"name": "Curt Clawson"},
      {"name": "Alma Adams"},
      {"name": "Dave Brat"},
      {"name": "Donald Norcross"},
      {"name": "Robert Dold"},
      {"name": "Frank Guinta"},
      {"name": "Ralph Abraham"},
      {"name": "Pete Aguilar"},
      {"name": "Rick W. Allen"},
      {"name": "Brad Ashford"},
      {"name": "Brian Babin"},
      {"name": "Don Beyer"},
      {"name": "Mike Bishop"},
      {"name": "Rod Blum"},
      {"name": "Mike Bost"},
      {"name": "Brendan F. Boyle"},
      {"name": "Ken Buck"},
      {"name": "Buddy Carter"},
      {"name": "Barbara Comstock"},
      {"name": "Ryan Costello"},
      {"name": "Carlos Curbelo"},
      {"name": "Mark DeSaulnier"},
      {"name": "Debbie Dingell"},
      {"name": "Tom Emmer"},
      {"name": "Ruben Gallego"},
      {"name": "Gwen Graham"},
      {"name": "Garret Graves"},
      {"name": "Glenn Grothman"},
      {"name": "Cresent Hardy"},
      {"name": "Jody Hice"},
      {"name": "French Hill"},
      {"name": "Will Hurd"},
      {"name": "Evan Jenkins"},
      {"name": "John Katko"},
      {"name": "Steve Knight"},
      {"name": "Brenda Lawrence"},
      {"name": "Ted Lieu"},
      {"name": "Barry Loudermilk"},
      {"name": "Mia Love"},
      {"name": "Tom MacArthur"},
      {"name": "Martha McSally"},
      {"name": "John Moolenaar"},
      {"name": "Alex Mooney"},
      {"name": "Seth Moulton"},
      {"name": "Dan Newhouse"},
      {"name": "Gary Palmer"},
      {"name": "Bruce Poliquin"},
      {"name": "John Ratcliffe"},
      {"name": "Kathleen Rice"},
      {"name": "David Rouzer"},
      {"name": "Steve Russell"},
      {"name": "Elise Stefanik"},
      {"name": "Mark Takai"},
      {"name": "Norma Torres"},
      {"name": "David Trott"},
      {"name": "Mark Walker"},
      {"name": "Mimi Walters"},
      {"name": "Bonnie Watson Coleman"},
      {"name": "Bruce Westerman"},
      {"name": "David Young"},
      {"name": "Lee Zeldin"},
      {"name": "Ryan Zinke"},
      {"name": "Dan Donovan"},
      {"name": "Trent Kelly"},
      {"name": "Richard Shelby"},
      {"name":"Jeff Sessions"},
      {"name": "Lisa Murkowski"},
      {"name": "Dan Sullivan"},
      {"name":"John McCain"},
      {"name":"Jeff Flake"},
      {"name": "John Boozman"},
      {"name":"Tom Cotton"},
      {"name": "Dianne Feinstein"},
      {"name":"Barbara Boxer"},
      {"name": "Michael Bennet"},
      {"name": "Cory Gardner"},
      {"name":"Richard Blumenthal"},
      {"name": "Chris Murphy"},
      {"name":"Tom Carper"},
      {"name":"Chris Coons"},
      {"name":"Bill Nelson"},
      {"name":"Marco Rubio"},
      {"name": "Johnny Isakson"},
      {"name": "David Perdue"},
      {"name": "Brian Schatz"},
      {"name": "Mazie Hirono"},
      {"name":"Mike Crapo"},
      {"name": "Jim Risch"},
      {"name":"Dick Durbin"},
      {"name": "Mark Kirk"},
      {"name":"Dan Coats"},
      {"name": "Joe Donnelly"},
      {"name":"Chuck Grassley"},
      {"name":"Joni Ernst"},
      {"name":"Pat Roberts"},
      {"name":"Jerry Moran"},
      {"name": "Mitch McConnell"},
      {"name": "Rand Paul"},
      {"name": "David Vitter"},
      {"name": "Bill Cassidy"},
      {"name": "Susan Collins"},
      {"name": "Angus King"},
      {"name": "Barbara Mikulski"},
      {"name": "Ben Cardin"},
      {"name":"Elizabeth Warren"},
      {"name":"Ed Markey"},
      {"name": "Debbie Stabenow"},
      {"name":"Gary Peters"},
      {"name": "Amy Klobuchar"},
      {"name": "Al Franken"},
      {"name": "Thad Cochran"},
      {"name": "Roger Wicker"},
      {"name":"hreaire McCaskill"},
      {"name": "Roy Blunt"},
      {"name": "Jon Tester"},
      {"name": "Steve Daines"},
      {"name":"Deb Fischer"},
      {"name":"Ben Sasse"},
      {"name": "Harry Reid"},
      {"name":"Dean Heller"},
      {"name": "Jeanne Shaheen"},
      {"name": "Kelly Ayotte"},
      {"name": "Bob Menendez"},
      {"name":"Cory Booker"},
      {"name":"Tom Udall"},
      {"name":"Martin Heinrich"},
      {"name": "Charles E. Schumer"},
      {"name":"Kirsten Gillibrand"},
      {"name": "Richard Burr"},
      {"name":"Thom Tillis"},
      {"name":"John Hoeven"},
      {"name":"hrHeidi Heitkamp"},
      {"name":"Sherrod Brown"},
      {"name":"Rob Portman"},
      {"name":"Jim Inhofe"},
      {"name":"James Lankford"},
      {"name":"Ron Wyden"},
      {"name": "Jeff Merkley"},
      {"name": "Bob Casey, Jr."},
      {"name":"Pat Toomey"},
      {"name": "Jack Reed"},
      {"name":"Sheldon Whitehouse"},
      {"name": "Lindsey Graham"},
      {"name":"Tim Scott"},
      {"name":"John Thune"},
      {"name":"Mike Rounds"},
      {"name":"Lamar Alexander"},
      {"name":"Bob Corker"},
      {"name":"John Cornyn"},
      {"name":"Ted Cruz"},
      {"name":"Orrin Hatch"},
      {"name":"Mike Lee"},
      {"name":"Patrick Leahy"},
      {"name":"Bernie Sanders"},
      {"name":"Mark Warner"},
      {"name":"Tim Kaine"},
      {"name":"Patty Murray"},
      {"name":"Maria Cantwell"},
      {"name":"Joe Manchin"},
      {"name":"Shelly Moore Capito"},
      {"name":"Ron Johnson"},
      {"name":"Tammy Baldwin"},
      {"name":"Mike Enzi"},
      {"name":"John Barrasso"}
    ];


    $scope.politicianData = {
                                "name" : null,
                                "electionCycle" : null,
                                "limit": null
                                }
            
        $scope.data = null;
        $scope.total = null;
        $scope.labels = null;
        $scope.pacs = null;
        $scope.info = null;
        $scope.title = null;
        $scope.gender_name = null;
        $scope.gender_donation = null;
        $scope.errorMessage = null;



        $scope.startSpin = function(){
                usSpinnerService.spin('spinner-1');

            }

        $scope.inputChanged = function(str) {
              $scope.politicianData.name = str;
            }
        
        $scope.getData = function() {
            var politicianInfo = {
                    name: $scope.politicianData.name.title,
                    electionCycle: $scope.politicianData.electionCycle,
                    limit: $scope.politicianData.limit
                   }
        $scope.searchedPolitician = $scope.politicianData.name.title;
                   // if (politicianInfo.name.split(" ").length === 1 || politicianInfo.name === null) {
                   //  $("#myAlert").alert()
                   // }
            // $http.get("/search")
            
        //  // var electionCycle = "2014";
            if (politicianInfo.name === undefined) {
                $scope.errorMessage = "Uh oh. It seems that politician isn't in our data database."
                usSpinnerService.stop('spinner-1');
            }
            debugger
            $http.get("/contributions.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res, status) {
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
                $http.get("/total.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res) {
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
                $http.get("/amount_from_pacs.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res) {
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

                $http.get("/gender_contributions.json", {params:{"name": politicianInfo.name, "cycle": politicianInfo.electionCycle, "limit": politicianInfo.limit}}).success(function (res) {
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

                
            }).error(function (data, status) {
                debugger
                if (status >= 300 || status < 200 || status.length === 0) {
                    $scope.errorMessage = "Uh oh. Something seems to have gone wrong."
                    usSpinnerService.stop('spinner-1');
                    $scope.searchedPolitician = null;
                }
            })
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




