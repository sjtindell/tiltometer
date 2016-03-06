var app = angular.module("app", [])
.controller("AppCtrl", function($scope, $http) {
  $scope.submit = function() {
    

    $http.get("/api/current/" + $scope.player.region + "/" + $scope.player.name)
    .then(function(currentGame) {
      console.log("CurrentGame:", currentGame)
      players = currentGame.data.participants
      bans = currentGame.data.bannedChampions
      current_start = currentGame.data.gameStartTime
      
      // set champion label strings for each player
      $http.get("/api/champ/" + $scope.player.region)
      .then(function(body) {
        staticChampData = body.data.data
        names = Object.keys(staticChampData)
        for (i = 0; i < names.length; i++) {
          champ = staticChampData[names[i]]
          for (k = 0; k < players.length; k++) {
            player = players[k]
            if (player.championId == champ.id) {
              player.currentChamp = champ
            }
          }
        }
      })

      // calculate one players tilt
      // begin calculation
      $http.get("/api/history/" + $scope.player.region + "/" + players[0].summonerId)
      .then(function(playerHistory) {
        player = players[0]
        console.log("Player:", player)

        // we only use summoners rift games for now
        // both ranked and unranked
        games = []
        for (i = 0; i < playerHistory.data.games.length; i++) {
          if (playerHistory.data.games[i].gameMode == "CLASSIC") {
            games.push(playerHistory.data.games[i])
          }
        }
        console.log("PlayerGames:", games)

        // playing a champ you're not used to because
        // they beat you last game
        previous_game = playerHistory.data.games[0]
        for (i = 0; i < previous_game.fellowPlayers.length; i++) {
          user = previous_game.fellowPlayers[i]
          // if you are playing a champ they played
          if (player.championId == user.championId &&
              // and they weren't on your team
              previous_game.stats.team != user.teamId &&
              // and you lost
              previous_game.stats.win == false &&
              // and you haven't played that champ often
              times_played < 3) { 
            console.log("playing a champ because they beat you.")
            console.log("they're tilted boys, +1")
          }
        }

        // was the last game an ff at 20 loss?
        last_game_time = previous_game.stats.timePlayed / 60
        if (last_game_time < 21 &&
            previous_game.stats.win == false) {
          console.log("last game ended @ 20 mins")
          console.log("and they lost. possible tilt +1")
        } else {
          console.log("Last Game Took:", last_game_time)
          console.log("and win is", previous_game.stats.win)
        }

        // has player played this champ recently
        times_played = 0
        for (i = 0; i < games.length; i++) {
          if (games[i].championId == player.championId) {
            times_played += 1
          }
        }
        // playing new champ e.g. bad lobby, favorite banned, etc.
        // have you played champ in last 10 games?
        console.log("PlayedThisChamp:", times_played, "times")
        if (times_played < 2) {
          console.log("possible tilt +1")
        }
        
        // unfamiliar lane?
        // cant get players current lane...yet?
        // show the players common roles
        // compare their champ to common meta picks
        // misses things like roaming, lane swaps, etc.

        position_role = {
          1: ["Top", "Duo"],
          2: ["Middle", "Support"],
          3: ["Jungle", "Carry"],
          4: ["Bot", "Solo"],
        }
        // get player common roles
        player_pr = {}
        for (i = 0; i < games.length; i++) {
          if (games[i].stats.playerPosition == undefined) {
            player_pr["NoPos"] = player_pr["NoPos"] + 1 || 1
          } else {
            pos_int = games[i].stats.playerPosition
            player_pos = position_role[pos_int][0]
            player_pr[player_pos] = player_pr[player_pos] + 1 || 1
          }

          if (games[i].stats.playerRole == undefined) {
            player_pr["NoRole"] = player_pr["None"] + 1 || 1
          } else {
            role_int = games[i].stats.playerRole
            player_role = position_role[role_int][1]
            player_pr[player_role] = player_pr[player_role] + 1 || 1
          }
        }

        console.log("Player Pos_Rol:", player_pr)


        //get session history
        count = 0
        play_times = []
        for (i = 0; i < games.length; i++) {
          minutes = Math.floor((current_start - games[i].createDate) / 60000)
          games[i].createMinutes = minutes
          if (minutes < 120) { 
            play_times.push(minutes)
            count += 1 
          }
          else if (minutes > 120) {
            play_times.push(minutes)
            continue
          }
          current_start = games[i].createDate
        } 

        if (count > 0) {
          session_games = games.slice(0, count)
          previous_games = games.slice(count)
          console.log("Played", count, "Games Recently:", session_games)
        } else {
          time = (current_start - games[i].createDate) / 60000
          console.log("No Recent Games. Time Since Last:", time)
        }

        function get_adjusted_kds(k, d, a) {
          calc = (k + (a / 2)) / d
          if (k == 0 && calc == Infinity) {
            calc = ["Infinity", d + (a / 2)]
          } else if (d == 0 && calc == Infinity) {
            calc = ["Infinity", k + (a / 2)]
          }
          return calc
        }

        function null_check(i) {
          if (i == undefined) {return 0}
          else {return i}
        }

        function get_kds(arr) {
          tmp = []
          for (i = 0; i < arr.length; i++) {
            stats = arr[i].stats
            k = null_check(stats.championsKilled)
            d = null_check(stats.numDeaths)
            a = null_check(stats.assists)
            total = get_adjusted_kds(k, d, a) 
            //console.log(k, d, a, k/d, total)
            tmp.push(total)
          }
          return tmp
        }
            
        // establish baseline, overall kds
        recent_kds = get_kds(games)
        console.log("All Games KD:", recent_kds)


        // consider number of games, k/d, etc.
        if (session_games) {
          // games
          previous_game = games[0]
          // recent_kds
          // session_games
          session_kds = get_kds(session_games)
          // previous_games (before session)
        
          // LOWER KDS
          // compare previous game to session
          // compare previous game to recent history
          // compare session kds to recent kds
          console.log("Session KD:", session_kds)
          console.log("To Compare:", recent_kds.slice(1))

          store = 0
          slice = recent_kds.slice(1)
          for (k = 0; k < slice.length; k++) {
            curr = slice[k]
            try {
              prev = session_kds[k]
            } catch(err) {
              break
            }
          } 

          for (i = 0; i < session_games.length; i++) {
            game = session_games[i]
            type = game.subType
            this_player = game.championId
            mode = game.gameMode
            ip = game.ipEarned

            stats = game.stats
            kills = stats.championsKilled
            deaths = stats.numDeaths
            assists = stats.assists
          }
        }
      })
    })
  }
})
