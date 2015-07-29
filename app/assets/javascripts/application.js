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
//= require bootstrap/dist/js/bootstrap.min.js
//= require Chart
//= require angular/angular
//= require angular-chart.js/dist/angular-chart.js
//= require spin.js/spin.js
//= require angular-spinner/angular-spinner.js
//= require angucomplete-alt/angucomplete-alt.js
//= require angular-filter/dist/angular-filter.js
//= require_tree .


//turbo links has been removed
// TODO:try getting the more modular version of this to work
var PoliticsApp = angular.module("PoliticsApp", ["chart.js", 'angularSpinner', "angucomplete-alt"])
.config(['ChartJsProvider', function (ChartJsProvider) {
}]);

PoliticsApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.
        defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}])



PoliticsApp.controller('GraphCtrl', ['$scope', '$timeout', '$http', 'usSpinnerService', function ($scope, $timeout, $http, usSpinnerService) {
    $scope.searchedPolitician = null;

    $scope.congressMembers = [
    {"name":"John Conyers"},
    {"name":"Charles Rangel"},
    {"name":"Don Young"},
    {"name":"James Sensenbrenner"},
    {"name":"Hal Rogers"},
    {"name":"Christopher Smith"},
    {"name":"Steny Hoyer"},
    {"name":"Marcy Kaptur"},
    {"name":"Sander Levin"},
    {"name":"Joe Barton"},
    {"name":"Pete Visclosky"},
    {"name":"Peter DeFazio"},
    {"name":"John Lewis"},
    {"name":"Louise Slaughter"},
    {"name":"Lamar Smith"},
    {"name":"Fred Upton"},
    {"name":"Nancy Pelosi"},
    {"name":"John Duncan"},
    {"name":"Frank Pallone"},
    {"name":"Eliot Engel"},
    {"name":"Nita Lowey"},
    {"name":"Jim McDermott"},
    {"name":"Richard Neal"},
    {"name":"Dana Rohrabacher"},
    {"name":"Ileana Ros-Lehtinen"},
    {"name":"José Serrano"},
    {"name":"David Price"},
    {"name":"John Boehner"},
    {"name":"Rosa DeLauro"},
    {"name":"Collin Peterson"},
    {"name":"Maxine Waters"},
    {"name":"Sam Johnson"},
    {"name":"Jerrold Nadler"},
    {"name":"Jim Cooper"},
    {"name":"Xavier Becerra"},
    {"name":"Sanford Bishop"},
    {"name":"Corrine Brown"},
    {"name":"Ken Calvert"},
    {"name":"Jim Clyburn"},
    {"name":"Anna Eshoo"},
    {"name":"Bob Goodlatte"},
    {"name":"Gene Green"},
    {"name":"Luis Gutiérrez"},
    {"name":"Alcee Hastings"},
    {"name":"Eddie Bernice Johnson"},
    {"name":"Peter King"},
    {"name":"Carolyn Maloney"},
    {"name":"John Mica"},
    {"name":"Lucille Roybal-Allard"},
    {"name":"Ed Royce"},
    {"name":"Bobby Rush"},
    {"name":"Bobby Scott"},
    {"name":"Nydia Velázquez"},
    {"name":"Bennie Thompson"},
    {"name":"Sam Farr"},
    {"name":"Frank Lucas"},
    {"name":"Lloyd Doggett"},
    {"name":"Mike Doyle"},
    {"name":"Chaka Fattah"},
    {"name":"Rodney Frelinghuysen"},
    {"name":"Sheila Jackson-Lee"},
    {"name":"Walter B. Jones"},
    {"name":"Frank LoBiondo"},
    {"name":"Zoe Lofgren"},
    {"name":"Mac Thornberry"},
    {"name":"Ed Whitfield"},
    {"name":"Elijah Cummings"},
    {"name":"Earl Blumenauer"},
    {"name":"Robert Aderholt"},
    {"name":"Kevin Brady"},
    {"name":"Danny Davis"},
    {"name":"Diana DeGette"},
    {"name":"Kay Granger"},
    {"name":"Rubén Hinojosa"},
    {"name":"Ron Kind"},
    {"name":"Jim McGovern"},
    {"name":"Bill Pascrell"},
    {"name":"Joe Pitts"},
    {"name":"Loretta Sanchez"},
    {"name":"Pete Sessions"},
    {"name":"Brad Sherman"},
    {"name":"John Shimkus"},
    {"name":"Adam Smith"},
    {"name":"Gregory Meeks"},
    {"name":"Lois Capps"},
    {"name":"Barbara Lee"},
    {"name":"Robert Brady"},
    {"name":"Steve Chabot"},
    {"name":"Mike Capuano"},
    {"name":"Joe Crowley"},
    {"name":"John Larson"},
    {"name":"Grace Napolitano"},
    {"name":"Paul Ryan"},
    {"name":"Jan Schakowsky"},
    {"name":"Mike Simpson"},
    {"name":"Mike Thompson"},
    {"name":"Greg Walden"},
    {"name":"William Lacy Clay"},
    {"name":"Ander Crenshaw"},
    {"name":"John Culberson"},
    {"name":"Susan Davis"},
    {"name":"Sam Graves"},
    {"name":"Mike Honda"},
    {"name":"Steve Israel"},
    {"name":"Darrell Issa"},
    {"name":"James Langevin"},
    {"name":"Rick Larsen"},
    {"name":"Betty McCollum"},
    {"name":"Adam Schiff"},
    {"name":"Patrick Tiberi"},
    {"name":"Bill Shuster"},
    {"name":"Randy Forbes"},
    {"name":"Stephen Lynch"},
    {"name":"Jeff Miller"},
    {"name":"Joe Wilson"},
    {"name":"Rob Bishop"},
    {"name":"Marsha Blackburn"},
    {"name":"Michael Burgess"},
    {"name":"John Carter"},
    {"name":"Tom Cole"},
    {"name":"Mario Diaz-Balart"},
    {"name":"Trent Franks"},
    {"name":"Scott Garrett"},
    {"name":"Raúl Grijalva"},
    {"name":"Jeb Hensarling"},
    {"name":"Steve King"},
    {"name":"John Kline"},
    {"name":"Candice Miller"},
    {"name":"Tim Murphy"},
    {"name":"Devin Nunes"},
    {"name":"Mike D. Rogers"},
    {"name":"Dutch Ruppersberger"},
    {"name":"Tim Ryan"},
    {"name":"Linda Sánchez"},
    {"name":"David Scott"},
    {"name":"Michael Turner"},
    {"name":"Chris Van Hollen"},
    {"name":"Randy Neugebauer"},
    {"name":"G. K. Butterfield"},
    {"name":"Charles Boustany"},
    {"name":"Emanuel Cleaver"},
    {"name":"Mike Conaway"},
    {"name":"Jim Costa"},
    {"name":"Henry Cuellar"},
    {"name":"Charlie Dent"},
    {"name":"Jeff Fortenberry"},
    {"name":"Virginia Foxx"},
    {"name":"Louie Gohmert"},
    {"name":"Al Green"},
    {"name":"Brian Higgins"},
    {"name":"Dan Lipinski"},
    {"name":"Kenny Marchant"},
    {"name":"Michael McCaul"},
    {"name":"Patrick McHenry"},
    {"name":"Cathy McMorris Rodgers"},
    {"name":"Gwen Moore"},
    {"name":"Ted Poe"},
    {"name":"Tom Price"},
    {"name":"Dave Reichert"},
    {"name":"Debbie Wasserman Schultz"},
    {"name":"Lynn Westmoreland"},
    {"name":"Doris Matsui"},
    {"name":"Albio Sires"},
    {"name":"Steve Pearce"},
    {"name":"Gus Bilirakis"},
    {"name":"Vern Buchanan"},
    {"name":"Kathy Castor"},
    {"name":"Yvette D. Clarke"},
    {"name":"Steve Cohen"},
    {"name":"Joe Courtney"},
    {"name":"Keith Ellison"},
    {"name":"Hank Johnson"},
    {"name":"Jim Jordan"},
    {"name":"Doug Lamborn"},
    {"name":"Dave Loebsack"},
    {"name":"Kevin McCarthy"},
    {"name":"Jerry McNerney"},
    {"name":"Ed Perlmutter"},
    {"name":"Peter Roskam"},
    {"name":"John Sarbanes"},
    {"name":"Adrian Smith"},
    {"name":"Tim Walz"},
    {"name":"Peter Welch"},
    {"name":"John Yarmuth"},
    {"name":"Niki Tsongas"},
    {"name":"Bob Latta"},
    {"name":"Rob Wittman"},
    {"name":"André Carson"},
    {"name":"Jackie Speier"},
    {"name":"Steve Scalise"},
    {"name":"Donna Edwards"},
    {"name":"Marcia Fudge"},
    {"name":"Rick Nolan"},
    {"name":"Matt Salmon"},
    {"name":"Mark Sanford"},
    {"name":"Jason Chaffetz"},
    {"name":"Mike Coffman"},
    {"name":"Gerry Connolly"},
    {"name":"John C. Fleming"},
    {"name":"Brett Guthrie"},
    {"name":"Gregg Harper"},
    {"name":"Jim Himes"},
    {"name":"Duncan D. Hunter"},
    {"name":"Lynn Jenkins"},
    {"name":"Leonard Lance"},
    {"name":"Blaine Luetkemeyer"},
    {"name":"Ben R. Luján"},
    {"name":"Cynthia Lummis"},
    {"name":"Tom McClintock"},
    {"name":"Pete Olson"},
    {"name":"Erik Paulsen"},
    {"name":"Chellie Pingree"},
    {"name":"Jared Polis"},
    {"name":"Bill Posey"},
    {"name":"Phil Roe"},
    {"name":"Tom Rooney"},
    {"name":"Kurt Schrader"},
    {"name":"Glenn Thompson"},
    {"name":"Paul Tonko"},
    {"name":"Michael Quigley"},
    {"name":"Judy Chu"},
    {"name":"John Garamendi"},
    {"name":"Ted Deutch"},
    {"name":"Tom Graves"},
    {"name":"Tom Reed"},
    {"name":"Marlin Stutzman"},
    {"name":"Mike Fitzpatrick"},
    {"name":"Tim Walberg"},
    {"name":"Bill Foster"},
    {"name":"Justin Amash"},
    {"name":"Lou Barletta"},
    {"name":"Karen Bass"},
    {"name":"Dan Benishek"},
    {"name":"Diane Black"},
    {"name":"Mo Brooks"},
    {"name":"Larry Bucshon"},
    {"name":"John Carney"},
    {"name":"David Cicilline"},
    {"name":"Rick Crawford"},
    {"name":"Jeff Denham"},
    {"name":"Scott DesJarlais"},
    {"name":"Sean Duffy"},
    {"name":"Jeff Duncan"},
    {"name":"Renee Ellmers"},
    {"name":"Blake Farenthold"},
    {"name":"Stephen Fincher"},
    {"name":"Chuck Fleischmann"},
    {"name":"Bill Flores"},
    {"name":"Bob Gibbs"},
    {"name":"Chris Gibson"},
    {"name":"Paul Gosar"},
    {"name":"Trey Gowdy"},
    {"name":"Morgan Griffith"},
    {"name":"Richard Hanna"},
    {"name":"Andy Harris"},
    {"name":"Vicky Hartzler"},
    {"name":"Joe Heck"},
    {"name":"Jaime Herrera Beutler"},
    {"name":"Tim Huelskamp"},
    {"name":"Bill Huizenga"},
    {"name":"Randy Hultgren"},
    {"name":"Robert Hurt"},
    {"name":"Bill Johnson"},
    {"name":"Bill Keating"},
    {"name":"Mike Kelly"},
    {"name":"Adam Kinzinger"},
    {"name":"Raúl Labrador"},
    {"name":"Billy Long"},
    {"name":"Tom Marino"},
    {"name":"David McKinley"},
    {"name":"Pat Meehan"},
    {"name":"Mick Mulvaney"},
    {"name":"Kristi Noem"},
    {"name":"Rich Nugent"},
    {"name":"Steven Palazzo"},
    {"name":"Mike Pompeo"},
    {"name":"Jim Renacci"},
    {"name":"Reid Ribble"},
    {"name":"Cedric Richmond"},
    {"name":"Scott Rigell"},
    {"name":"Martha Roby"},
    {"name":"Todd Rokita"},
    {"name":"Dennis Ross"},
    {"name":"David Schweikert"},
    {"name":"Austin Scott"},
    {"name":"Terri Sewell"},
    {"name":"Steve Stivers"},
    {"name":"Scott Tipton"},
    {"name":"Daniel Webster"},
    {"name":"Frederica Wilson"},
    {"name":"Steve Womack"},
    {"name":"Rob Woodall"},
    {"name":"Kevin Yoder"},
    {"name":"Todd Young"},
    {"name":"Janice Hahn"},
    {"name":"Mark Amodei"},
    {"name":"Suzanne Bonamici"},
    {"name":"Suzan DelBene"},
    {"name":"Thomas Massie"},
    {"name":"Donald Payne, Jr."},
    {"name":"Alan Grayson"},
    {"name":"Ann Kirkpatrick"},
    {"name":"Dina Titus"},
    {"name":"Andy Barr"},
    {"name":"Joyce Beatty"},
    {"name":"Ami Bera"},
    {"name":"Jim Bridenstine"},
    {"name":"Susan Brooks"},
    {"name":"Julia Brownley"},
    {"name":"Cheri Bustos"},
    {"name":"Tony Cardenas"},
    {"name":"Matt Cartwright"},
    {"name":"Joaquin Castro"},
    {"name":"Chris Collins"},
    {"name":"Doug Collins"},
    {"name":"Paul Cook"},
    {"name":"Kevin Cramer"},
    {"name":"Rodney Davis"},
    {"name":"John Delaney"},
    {"name":"Ron DeSantis"},
    {"name":"Tammy Duckworth"},
    {"name":"Elizabeth Esty"},
    {"name":"Lois Frankel"},
    {"name":"Tulsi Gabbard"},
    {"name":"Dennis Heck"},
    {"name":"George Holding"},
    {"name":"Richard Hudson"},
    {"name":"Jared Huffman"},
    {"name":"Hakeem Jeffries"},
    {"name":"David Joyce"},
    {"name":"Joseph Kennedy III"},
    {"name":"Dan Kildee"},
    {"name":"Derek Kilmer"},
    {"name":"Ann McLane Kuster"},
    {"name":"Doug LaMalfa"},
    {"name":"Alan Lowenthal"},
    {"name":"Michelle Lujan Grisham"},
    {"name":"Sean Patrick Maloney"},
    {"name":"Mark Meadows"},
    {"name":"Grace Meng"},
    {"name":"Luke Messer"},
    {"name":"Markwayne Mullin"},
    {"name":"Patrick Murphy"},
    {"name":"Beto O'Rourke"},
    {"name":"Scott Perry"},
    {"name":"Scott Peters"},
    {"name":"Robert Pittenger"},
    {"name":"Mark Pocan"},
    {"name":"Tom Rice"},
    {"name":"Keith Rothfus"},
    {"name":"Raul Ruiz"},
    {"name":"Kyrsten Sinema"},
    {"name":"Chris Stewart"},
    {"name":"Eric Swalwell"},
    {"name":"Mark Takano"},
    {"name":"David Valadao"},
    {"name":"Juan Vargas"},
    {"name":"Marc Veasey"},
    {"name":"Filemon Vela"},
    {"name":"Ann Wagner"},
    {"name":"Jackie Walorski"},
    {"name":"Randy Weber"},
    {"name":"Brad Wenstrup"},
    {"name":"Roger Williams"},
    {"name":"Ted Yoho"},
    {"name":"Robin Kelly"},
    {"name":"Jason Smith"},
    {"name":"Katherine Clark"},
    {"name":"Bradley Byrne"},
    {"name":"David Jolly"},
    {"name":"Curt Clawson"},
    {"name":"Alma Adams"},
    {"name":"Dave Brat"},
    {"name":"Donald Norcross"},
    {"name":"Robert Dold"},
    {"name":"Frank Guinta"},
    {"name":"Ralph Abraham"},
    {"name":"Pete Aguilar"},
    {"name":"Rick W. Allen"},
    {"name":"Brad Ashford"},
    {"name":"Brian Babin"},
    {"name":"Don Beyer"},
    {"name":"Mike Bishop"},
    {"name":"Rod Blum"},
    {"name":"Mike Bost"},
    {"name":"Brendan F. Boyle"},
    {"name":"Ken Buck"},
    {"name":"Buddy Carter"},
    {"name":"Barbara Comstock"},
    {"name":"Ryan Costello"},
    {"name":"Carlos Curbelo"},
    {"name":"Mark DeSaulnier"},
    {"name":"Debbie Dingell"},
    {"name":"Tom Emmer"},
    {"name":"Ruben Gallego"},
    {"name":"Gwen Graham"},
    {"name":"Garret Graves"},
    {"name":"Glenn Grothman"},
    {"name":"Cresent Hardy"},
    {"name":"Jody Hice"},
    {"name":"French Hill"},
    {"name":"Will Hurd"},
    {"name":"Evan Jenkins"},
    {"name":"John Katko"},
    {"name":"Steve Knight"},
    {"name":"Brenda Lawrence"},
    {"name":"Ted Lieu"},
    {"name":"Barry Loudermilk"},
    {"name":"Mia Love"},
    {"name":"Tom MacArthur"},
    {"name":"Martha McSally"},
    {"name":"John Moolenaar"},
    {"name":"Alex Mooney"},
    {"name":"Seth Moulton"},
    {"name":"Dan Newhouse"},
    {"name":"Gary Palmer"},
    {"name":"Bruce Poliquin"},
    {"name":"John Ratcliffe"},
    {"name":"Kathleen Rice"},
    {"name":"David Rouzer"},
    {"name":"Steve Russell"},
    {"name":"Elise Stefanik"},
    {"name":"Mark Takai"},
    {"name":"Norma Torres"},
    {"name":"David Trott"},
    {"name":"Mark Walker"},
    {"name":"Mimi Walters"},
    {"name":"Bonnie Watson Coleman"},
    {"name":"Bruce Westerman"},
    {"name":"David Young"},
    {"name":"Lee Zeldin"},
    {"name":"Ryan Zinke"},
    {"name":"Dan Donovan"},
    {"name":"Trent Kelly"},
    {"name":"Richard Shelby"},
    {"name":"Jeff Sessions"},
    {"name":"Lisa Murkowski"},
    {"name":"Dan Sullivan"},
    {"name":"John McCain"},
    {"name":"Jeff Flake"},
    {"name":"John Boozman"},
    {"name":"Tom Cotton"},
    {"name":"Dianne Feinstein"},
    {"name":"Barbara Boxer"},
    {"name":"Michael Bennet"},
    {"name":"Cory Gardner"},
    {"name":"Richard Blumenthal"},
    {"name":"Chris Murphy"},
    {"name":"Tom Carper"},
    {"name":"Chris Coons"},
    {"name":"Bill Nelson"},
    {"name":"Marco Rubio"},
    {"name":"Johnny Isakson"},
    {"name":"David Perdue"},
    {"name":"Brian Schatz"},
    {"name":"Mazie Hirono"},
    {"name":"Mike Crapo"},
    {"name":"Jim Risch"},
    {"name":"Dick Durbin"},
    {"name":"Mark Kirk"},
    {"name":"Dan Coats"},
    {"name":"Joe Donnelly"},
    {"name":"Chuck Grassley"},
    {"name":"Joni Ernst"},
    {"name":"Pat Roberts"},
    {"name":"Jerry Moran"},
    {"name":"Mitch McConnell"},
    {"name":"Rand Paul"},
    {"name":"David Vitter"},
    {"name":"Bill Cassidy"},
    {"name":"Susan Collins"},
    {"name":"Angus King"},
    {"name":"Barbara Mikulski"},
    {"name":"Ben Cardin"},
    {"name":"Elizabeth Warren"},
    {"name":"Ed Markey"},
    {"name":"Debbie Stabenow"},
    {"name":"Gary Peters"},
    {"name":"Amy Klobuchar"},
    {"name":"Al Franken"},
    {"name":"Thad Cochran"},
    {"name":"Roger Wicker"},
    {"name":"Claire McCaskill"},
    {"name":"Roy Blunt"},
    {"name":"Jon Tester"},
    {"name":"Steve Daines"},
    {"name":"Deb Fischer"},
    {"name":"Ben Sasse"},
    {"name":"Harry Reid"},
    {"name":"Dean Heller"},
    {"name":"Jeanne Shaheen"},
    {"name":"Kelly Ayotte"},
    {"name":"Bob Menendez"},
    {"name":"Cory Booker"},
    {"name":"Tom Udall"},
    {"name":"Martin Heinrich"},
    {"name":"Charles Schumer"},
    {"name":"Kirsten Gillibrand"},
    {"name":"Richard Burr"},
    {"name":"Thom Tillis"},
    {"name":"John Hoeven"},
    {"name":"Heidi Heitkamp"},
    {"name":"Sherrod Brown"},
    {"name":"Rob Portman"},
    {"name":"Jim Inhofe"},
    {"name":"James Lankford"},
    {"name":"Ron Wyden"},
    {"name":"Jeff Merkley"},
    {"name":"Bob Casey, Jr."},
    {"name":"Pat Toomey"},
    {"name":"Jack Reed"},
    {"name":"Sheldon Whitehouse"},
    {"name":"Lindsey Graham"},
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
    {"name":"John Barrasso"},
    {"name":"Jo Bonner"},
    {"name":"Terry Everett"},
    {"name":"Bud Cramer"},
    {"name":"Spencer Bachus"},
    {"name":"Artur Davis"},
    {"name":"Rick Renzi"},
    {"name":"John Shadegg"},
    {"name":"Ed Pastor"},
    {"name":"Harry Mitchell"},
    {"name":"Raúl M. Grijalva"},
    {"name":"Gabrielle Giffords"},
    {"name":"Marion Berry"},
    {"name":"Vic Snyder"},
    {"name":"Mike Ross"},
    {"name":"Wally Herger"},
    {"name":"Dan Lungren"},
    {"name":"John Doolittle"},
    {"name":"Lynn Woolsey"},
    {"name":"George Miller"},
    {"name":"Ellen Tauscher"},
    {"name":"Tom Lantos"},
    {"name":"Pete Stark"},
    {"name":"Dennis Cardoza"},
    {"name":"George Radanovich"},
    {"name":"Elton Gallegly"},
    {"name":"Howard McKeon"},
    {"name":"David Dreier"},
    {"name":"Howard Berman"},
    {"name":"Henry Waxman"},
    {"name":"Hilda Solis"},
    {"name":"Diane Watson"},
    {"name":"Jane Harman"},
    {"name":"Juanita Millender-McDonald"},
    {"name":"Edward R. Royce"},
    {"name":"Jerry Lewis"},
    {"name":"Gary Miller"},
    {"name":"Joe Baca"},
    {"name":"Mary Bono"},
    {"name":"John Campbell"},
    {"name":"Brian Bilbray"},
    {"name":"Bob Filner"},
    {"name":"Duncan Hunter"},
    {"name":"Mark Udall"},
    {"name":"John Salazar"},
    {"name":"Marilyn Musgrave"},
    {"name":"Thomas G. Tancredo"},
    {"name":"Christopher Shays"},
    {"name":"Michael N. Castle"},
    {"name":"Allen Boyd"},
    {"name":"Ginny Brown-Waite"},
    {"name":"Cliff Stearns"},
    {"name":"Ric Keller"},
    {"name":"Bill Young"},
    {"name":"Adam Putnam"},
    {"name":"Connie Mack IV"},
    {"name":"Dave Weldon"},
    {"name":"Tim Mahoney"},
    {"name":"Kendrick Meek"},
    {"name":"Robert Wexler"},
    {"name":"Lincoln Diaz-Balart"},
    {"name":"Ron Klein"},
    {"name":"Tom Feeney"},
    {"name":"Jack Kingston"},
    {"name":"John Linder"},
    {"name":"Jim Marshall"},
    {"name":"Nathan Deal"},
    {"name":"Charlie Norwood"},
    {"name":"Phil Gingrey"},
    {"name":"John Barrow"},
    {"name":"Neil Abercrombie"},
    {"name":"William Sali"},
    {"name":"Michael K. Simpson"},
    {"name":"Jesse Jackson, Jr."},
    {"name":"Luis Gutierrez"},
    {"name":"Rahm Emanuel"},
    {"name":"Danny K. Davis"},
    {"name":"Melissa Bean"},
    {"name":"Janice D. Schakowsky"},
    {"name":"Mark Steven Kirk"},
    {"name":"Jerry Weller"},
    {"name":"Jerry Costello"},
    {"name":"Judy Biggert"},
    {"name":"Dennis Hastert"},
    {"name":"Timothy V. Johnson"},
    {"name":"Donald Manzullo"},
    {"name":"Philip Hare"},
    {"name":"Ray LaHood"},
    {"name":"Mark Souder"},
    {"name":"Steve Buyer"},
    {"name":"Dan Burton"},
    {"name":"Mike Pence"},
    {"name":"Julia Carson"},
    {"name":"Brad Ellsworth"},
    {"name":"Baron Hill"},
    {"name":"Bruce Braley"},
    {"name":"David Loebsack"},
    {"name":"Leonard Boswell"},
    {"name":"Tom Latham"},
    {"name":"Nancy Boyda"},
    {"name":"Dennis Moore"},
    {"name":"Todd Tiahrt"},
    {"name":"Ron Lewis"},
    {"name":"Geoff Davis"},
    {"name":"Harold Rogers"},
    {"name":"Ben Chandler"},
    {"name":"Bobby Jindal"},
    {"name":"William J. Jefferson"},
    {"name":"Charlie Melancon"},
    {"name":"Jim McCrery"},
    {"name":"Rodney Alexander"},
    {"name":"Richard H. Baker"},
    {"name":"Tom Allen"},
    {"name":"Mike Michaud"},
    {"name":"Wayne Gilchrest"},
    {"name":"Albert Wynn"},
    {"name":"Roscoe Bartlett"},
    {"name":"John Olver"},
    {"name":"Barney Frank"},
    {"name":"Marty Meehan"},
    {"name":"John Tierney"},
    {"name":"Bill Delahunt"},
    {"name":"Bart Stupak"},
    {"name":"Peter Hoekstra"},
    {"name":"Vern Ehlers"},
    {"name":"David Lee Camp"},
    {"name":"Dale E. Kildee"},
    {"name":"Mike Rogers"},
    {"name":"Joe Knollenberg"},
    {"name":"Thaddeus McCotter"},
    {"name":"Carolyn Cheeks Kilpatrick"},
    {"name":"John Dingell"},
    {"name":"Jim Ramstad"},
    {"name":"Michele Bachmann"},
    {"name":"Jim Oberstar"},
    {"name":"Chip Pickering"},
    {"name":"Gene Taylor"},
    {"name":"William Lacy Clay, Jr."},
    {"name":"Todd Akin"},
    {"name":"Russ Carnahan"},
    {"name":"Ike Skelton"},
    {"name":"Jo Ann Emerson"},
    {"name":"Kenny Hulshof"},
    {"name":"Denny Rehberg"},
    {"name":"Lee Terry"},
    {"name":"Shelley Berkley"},
    {"name":"Jon Porter"},
    {"name":"Carol Shea-Porter"},
    {"name":"Paul Hodes"},
    {"name":"Rob Andrews"},
    {"name":"Jim Saxton"},
    {"name":"Chris Smith"},
    {"name":"Mike Ferguson"},
    {"name":"Bill Pascrell Jr."},
    {"name":"Steve Rothman"},
    {"name":"Donald M. Payne"},
    {"name":"Rush D. Holt Jr."},
    {"name":"Heather Wilson"},
    {"name":"Tim Bishop"},
    {"name":"Peter T. King"},
    {"name":"Carolyn McCarthy"},
    {"name":"Gary Ackerman"},
    {"name":"Gregory W. Meeks"},
    {"name":"Joseph Crowley"},
    {"name":"Anthony D. Weiner"},
    {"name":"Ed Towns"},
    {"name":"Vito Fossella"},
    {"name":"Carolyn B. Maloney"},
    {"name":"Eliot L. Engel"},
    {"name":"John Hall"},
    {"name":"Michael R. McNulty"},
    {"name":"Maurice Hinchey"},
    {"name":"John M. McHugh"},
    {"name":"Michael Arcuri"},
    {"name":"Jim Walsh"},
    {"name":"Tom Reynolds"},
    {"name":"Louise McIntosh Slaughter"},
    {"name":"Randy Kuhl"},
    {"name":"Bob Etheridge"},
    {"name":"Howard Coble"},
    {"name":"Mike McIntyre"},
    {"name":"Robin Hayes"},
    {"name":"Sue Wilkins Myrick"},
    {"name":"Heath Shuler"},
    {"name":"Mel Watt"},
    {"name":"Brad Miller"},
    {"name":"Earl Pomeroy"},
    {"name":"Jean Schmidt"},
    {"name":"Michael R. Turner"},
    {"name":"Paul Gillmor"},
    {"name":"Charlie Wilson"},
    {"name":"Dave Hobson"},
    {"name":"Dennis J. Kucinich"},
    {"name":"Stephanie Tubbs Jones"},
    {"name":"Pat Tiberi"},
    {"name":"Betty Sutton"},
    {"name":"Steve LaTourette"},
    {"name":"Deborah Pryce"},
    {"name":"Ralph S. Regula"},
    {"name":"Zack Space"},
    {"name":"John Sullivan"},
    {"name":"Dan Boren"},
    {"name":"Mary Fallin"},
    {"name":"David Wu"},
    {"name":"Darlene Hooley"},
    {"name":"Bob Brady"},
    {"name":"Phil English"},
    {"name":"Jason Altmire"},
    {"name":"John E. Peterson"},
    {"name":"Jim Gerlach"},
    {"name":"Joe Sestak"},
    {"name":"Chris Carney"},
    {"name":"Paul E. Kanjorski"},
    {"name":"John Murtha"},
    {"name":"Allyson Schwartz"},
    {"name":"Michael F. Doyle"},
    {"name":"Joseph R. Pitts"},
    {"name":"Tim Holden"},
    {"name":"Todd Platts"},
    {"name":"Patrick J. Kennedy"},
    {"name":"Henry E. Brown, Jr."},
    {"name":"Gresham Barrett"},
    {"name":"Bob Inglis"},
    {"name":"John Spratt"},
    {"name":"Stephanie Herseth Sandlin"},
    {"name":"David Davis"},
    {"name":"Zach Wamp"},
    {"name":"Lincoln Davis"},
    {"name":"Bart Gordon"},
    {"name":"John S. Tanner"},
    {"name":"Ralph Hall"},
    {"name":"Ron Paul"},
    {"name":"Silvestre Reyes"},
    {"name":"Chet Edwards"},
    {"name":"Charlie Gonzalez"},
    {"name":"Lamar S. Smith"},
    {"name":"Nick Lampson"},
    {"name":"Ciro Rodriguez"},
    {"name":"Michael C. Burgess"},
    {"name":"Solomon P. Ortiz"},
    {"name":"Jim Matheson"},
    {"name":"Chris Cannon"},
    {"name":"Jo Ann Davis"},
    {"name":"Thelma Drake"},
    {"name":"Robert C. Scott"},
    {"name":"Virgil Goode"},
    {"name":"Eric Cantor"},
    {"name":"Jim Moran"},
    {"name":"Rick Boucher"},
    {"name":"Frank Wolf"},
    {"name":"Thomas M. Davis"},
    {"name":"Jay Inslee"},
    {"name":"Brian Baird"},
    {"name":"Doc Hastings"},
    {"name":"Norm Dicks"},
    {"name":"Alan Mollohan"},
    {"name":"Shelley Moore Capito"},
    {"name":"Nick Rahall"},
    {"name":"Jim Sensenbrenner"},
    {"name":"Tom Petri"},
    {"name":"Dave Obey"},
    {"name":"Steve Kagen"},
    {"name":"Barbara Cubin"},
    {"name":"Ted Stevens"},
    {"name":"Jon Kyl"},
    {"name":"Blanche Lincoln"},
    {"name":"Mark Pryor"},
    {"name":"Wayne Allard"},
    {"name":"Ken Salazar"},
    {"name":"Chris Dodd"},
    {"name":"Joe Lieberman"},
    {"name":"Joe Biden"},
    {"name":"Mel Martinez"},
    {"name":"Saxby Chambliss"},
    {"name":"Daniel Inouye"},
    {"name":"Daniel Akaka"},
    {"name":"Larry Craig"},
    {"name":"Barack Obama"},
    {"name":"Richard Lugar"},
    {"name":"Evan Bayh"},
    {"name":"Tom Harkin"},
    {"name":"Sam Brownback"},
    {"name":"Jim Bunning"},
    {"name":"Mary Landrieu"},
    {"name":"Olympia Snowe"},
    {"name":"Ted Kennedy"},
    {"name":"John Kerry"},
    {"name":"Carl Levin"},
    {"name":"Norm Coleman"},
    {"name":"Trent Lott"},
    {"name":"Kit Bond"},
    {"name":"Max Baucus"},
    {"name":"Chuck Hagel"},
    {"name":"Ben Nelson"},
    {"name":"John Ensign"},
    {"name":"Judd Gregg"},
    {"name":"John E. Sununu"},
    {"name":"Frank Lautenberg"},
    {"name":"Pete Domenici"},
    {"name":"Jeff Bingaman"},
    {"name":"Hillary Clinton"},
    {"name":"Elizabeth Dole"},
    {"name":"Kent Conrad"},
    {"name":"Byron Dorgan"},
    {"name":"George Voinovich"},
    {"name":"Tom Coburn"},
    {"name":"Gordon Smith"},
    {"name":"Arlen Specter"},
    {"name":"Jim DeMint"},
    {"name":"Tim Johnson"},
    {"name":"Kay Bailey Hutchison"},
    {"name":"Robert Bennett"},
    {"name":"John Warner"},
    {"name":"Jim Webb"},
    {"name":"Robert Byrd"},
    {"name":"Jay Rockefeller"},
    {"name":"Herb Kohl"},
    {"name":"Russ Feingold"},
    {"name":"Craig Thomas"},
    {"name":"Mark Begich"},
    {"name":"Christopher Dodd"},
    {"name":"Richard Durbin"},
    {"name":"Roland Burris"},
    {"name":"Edward M. Kennedy"},
    {"name":"Mike Johanns"},
    {"name":"Kay Hagan"},
    {"name":"Bob Casey"},
    {"name":"Bob Bennett"},
    {"name":"Michael Enzi"},
    {"name":"Bobby Bright"},
    {"name":"Parker Griffith"},
    {"name":"Raul Grijalva"},
    {"name":"Laura Richardson"},
    {"name":"Linda Sanchez"},
    {"name":"Mary Bono Mack"},
    {"name":"Betsy Markey"},
    {"name":"Michael Castle"},
    {"name":"Connie Mack"},
    {"name":"Suzanne Kosmas"},
    {"name":"Paul Broun"},
    {"name":"Walt Minnick"},
    {"name":"Michael Simpson"},
    {"name":"Jesse Jackson"},
    {"name":"Debbie Halvorson"},
    {"name":"Phil Hare"},
    {"name":"Aaron Schock"},
    {"name":"Andre Carson"},
    {"name":"Joseph Cao"},
    {"name":"John Fleming"},
    {"name":"Frank Kratovil"},
    {"name":"David Camp"},
    {"name":"Dale Kildee"},
    {"name":"Mark Schauer"},
    {"name":"Carolyn Cheeks"},
    {"name":"Travis Childers"},
    {"name":"William Clay"},
    {"name":"John Adler"},
    {"name":"Donald Payne"},
    {"name":"Rush Holt"},
    {"name":"Harry Teague"},
    {"name":"Ben Lujan"},
    {"name":"Anthony Weiner"},
    {"name":"Yvette Clarke"},
    {"name":"Michael McMahon"},
    {"name":"Jose Serrano"},
    {"name":"John McHugh"},
    {"name":"Mike Arcuri"},
    {"name":"Dan Maffei"},
    {"name":"Chris Lee"},
    {"name":"Eric Massa"},
    {"name":"Walter Jones"},
    {"name":"Larry Kissell"},
    {"name":"Sue Myrick"},
    {"name":"Steve Driehaus"},
    {"name":"Mike Turner"},
    {"name":"Steve Austria"},
    {"name":"Dennis Kucinich"},
    {"name":"Mary Kilroy"},
    {"name":"John Boccieri"},
    {"name":"Kathy Dahlkemper"},
    {"name":"Paul Kanjorski"},
    {"name":"Michael Doyle"},
    {"name":"Joseph Pitts"},
    {"name":"Patrick Kennedy"},
    {"name":"Henry Brown"},
    {"name":"John Tanner"},
    {"name":"Ruben Hinojosa"},
    {"name":"Sheila Jackson Lee"},
    {"name":"Solomon Ortiz"},
    {"name":"Bernice Johnson"},
    {"name":"Glenn Nye"},
    {"name":"Tom Perriello"},
    {"name":"Cathy Rodgers"},
    {"name":"Scott Brown"},
    {"name":"Ben Quayle"},
    {"name":"Timothy Griffin"},
    {"name":"Steve Southerland"},
    {"name":"Allen West"},
    {"name":"Sandy Adams"},
    {"name":"David Rivera"},
    {"name":"Colleen Hanabusa"},
    {"name":"Raul Labrador"},
    {"name":"Joe Walsh"},
    {"name":"Don Manzullo"},
    {"name":"Bobby Schilling"},
    {"name":"Jeff Landry"},
    {"name":"Andrew Harris"},
    {"name":"William Keating"},
    {"name":"Dave Camp"},
    {"name":"Hansen Clarke"},
    {"name":"Chip Cravaack"},
    {"name":"Alan Nunnelee"},
    {"name":"Bill Long"},
    {"name":"Charles Bass"},
    {"name":"Jon Runyan"},
    {"name":"Edolphus Towns"},
    {"name":"Nydia Velazquez"},
    {"name":"Michael Grimm"},
    {"name":"Nan Hayworth"},
    {"name":"Bill Owens"},
    {"name":"Ann Marie Buerkle"},
    {"name":"Rick Berg"},
    {"name":"Mark Critz"},
    {"name":"Timothy Murphy"},
    {"name":"Jimmy Duncan"},
    {"name":"Quico Canseco"},
    {"name":"Norman Dicks"},
    {"name":"Cynthia Lummis"}
    ];


    $scope.politicianData = {
        name:null,
        electionCycle:"2014",
        limit:null
    };
            
    $scope.topContributionAmounts = [];
    $scope.topContributionNames = [];
    $scope.total = null;
    $scope.pacContributionAmounts = [];
    $scope.pacContributionNames = [];
    $scope.errorMessage = null;
    $scope.hasError = false;
    $scope.isLoading = false;

    $scope.startSpin = function(){
        $scope.isLoading = true; 
        usSpinnerService.spin('spinner-1');
    };

    $scope.stopSpin = function(){
        $scope.isLoading = false; 
        usSpinnerService.stop('spinner-1');
    };

    $scope.disableSubmit = function() {
        var name = $scope.politicianData.name;
        return name == null || name.length === 0;
    };

    $scope.displayCharts = function() {
        return !$scope.isLoading && !$scope.hasError;
    };
    
    $scope.getData = function() {
        $scope.hasError = false;
        var politicianInfo = {
            name:$scope.politicianData.name.title,
            cycle:$scope.politicianData.electionCycle,
            limit:$scope.politicianData.limit
        };
        $scope.searchedPolitician = politicianInfo.name;
               
        $scope.startSpin();
        $http.get("/contributions.json", {params:politicianInfo}).success(function (res, status) {
            var topContributionAmounts = [];
            var topContributionNames = [];
            var topContributions = res.data;
            var totalFromTopContributors = 0;
            topContributions.forEach(function(contribution){
                var contributorName = contribution[0];
                var amount = contribution[1];
                topContributionNames.push(contributorName);
                topContributionAmounts.push(amount);
                totalFromTopContributors += amount;
            });
            $scope.totalFromTopContributors = totalFromTopContributors;
            
            $scope.firstChartDescription = "Amount Donated by Top Thirty Contributors";
            $scope.secondChartDescription = "Contrubutions from PACs vs All Other Contributors"
            $http.get("/total.json", {params:politicianInfo}).success(function (res) {
                $scope.total = res.data.total;
                console.log($scope.total)
                var totalMinusTopContributors = $scope.total - $scope.totalFromTopContributors;
                console.log($scope.total)
                topContributionNames.push("Remainder")
                topContributionAmounts.push(totalMinusTopContributors);
                $scope.topContributionNames = topContributionNames;
                $scope.topContributionAmounts = topContributionAmounts;
            });

            // This method displays two totals because I am adding it twice
            // once after subtracting pac contributions
            // and again when I concat $scope.topContributionAmounts because it already contains a total
            $http.get("/amount_from_pacs.json", {params:politicianInfo}).success(function (res) {
                $scope.pacContributionAmounts = [];
                $scope.pacContributionNames = [];
                var pacContributions = res.data;
                pacContributions.forEach(function(contribution) {
                    var name = contribution[0];
                    var amount = contribution[1];
                    $scope.pacContributionNames.push(name);
                    $scope.pacContributionAmounts.push(amount);
                });

                var totalMinusTopPacs = $scope.total;
                for (var i = 0; i < $scope.pacContributionAmounts.length; i++) {
                    totalMinusTopPacs -= $scope.pacContributionAmounts[i];
                }
                $scope.pacContributionAmounts.push(totalMinusTopPacs);
                $scope.pacContributionNames.push("Remainder")
                $scope.stopSpin();
            });
            
        }).error(function (data, status) {
            console.log(status)
            $scope.hasError = true;
            if (status >= 300 || status < 200 || status.length === 0) {
                $scope.errorMessage = data
                $scope.stopSpin();
                $scope.searchedPolitician = null;
            }
        });
    }

    $timeout(function () {
    }, 500);
}]);
