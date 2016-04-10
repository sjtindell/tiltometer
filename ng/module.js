var app = angular.module("app", [])
.controller("AppCtrl", function($scope, CalcSvc) {
  $scope.submit = function() {
    region = $scope.player.region
    name = $scope.player.name
    CalcSvc.getTilt(region, name)
  }
})
   


