var angular = require('angular');
var L = require('leaflet');

var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

var cities = L.layerGroup([littleton, denver, aurora, golden]);

var mapboxUrl= 'https://api.tiles.mapbox.com/v4/explorer06.ciee9sdy8026rsom89zp18y71/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXhwbG9yZXIwNiIsImEiOiJjNmRhNDE5ZjgxZjJiYTM0ZmMyMzJjYzgzZjI5ZWE2MiJ9.5kSybJ0602ASLKMfeb6m9g';
var mapboxAttribution= 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-   SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
var grayscale = L.tileLayer(mapboxUrl, {id: 'explorer06.ciee9sdy8026rsom89zp18y71', attribution: mapboxAttribution}),
    streets   = L.tileLayer(mapboxUrl, {id: 'explorer06.ciee9sdy8026rsom89zp18y71', attribution: mapboxAttribution});

var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [grayscale, cities]
});

var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlayMaps = {
    "Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

var app = angular.module('webgis',[]);

angular.module('webgis').controller('AccordionDemoCtrl',function($scope) {

  // BUTTONS ======================

  // define some random object and button values
  $scope.bigData = {};

  $scope.bigData.breakfast = false;
  $scope.bigData.lunch = false;
  $scope.bigData.dinner = false;

  // COLLAPSE =====================
  $scope.isCollapsed = false;

  $scope.$watch(function(){console.log(arguments)});

}); 

app.controller('UserProfileController',['$scope','$http',function($scope,$http){
  $scope.gh_handle = '';
  $scope.pic = '';
  
  $scope.fetchuser = function(){
    $http.get('http://localhost:3000/users/'+$scope.handle)
    .success(function(data,status,headers,config){
      $scope.gh_handle = data[0].gh_handle;
      $scope.pic = data[0].gh_pic_url;
      $scope.repo_count = data[0].repo_count;
      $scope.people = data[0].people;
    });
  };


}]);
        
