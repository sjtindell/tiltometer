var app = angular.module("app")
.service("CalcSvc", function($http) {  
  var svc = this
  svc.getTilt = function(region, name) {
    current_game = "/api/current/" + region + "/" + name
    history_root = "/api/history/" + region + "/"

    $http.get(current_game)
    .then(function(currentGame) {
      console.log("CurrentGame:", currentGame)
      players = currentGame.data.participants
      current_start = currentGame.data.gameStartTime

      $http.get(history_root + players[0].summonerId)
       .then(function(playerHistory) {
        player = players[0]
        console.log("Player:", player)
        console.log("All Games:", playerHistory.data.games)
      })
    })
  }
})
