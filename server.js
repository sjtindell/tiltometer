var express = require("express");
var bodyParser = require("body-parser");
var request = require("request-promise");
var path = require("path")
var conf = require("./config")
var util = require("util")

var app = express();
app.use(bodyParser.json());


app.get("/", function(req, res) {
  res.sendFile(path.resolve("app.html"))
})


app.get("/api/current/:region/:name", function(req, res, next) {

  var region = req.params.region
  var name = req.params.name

  // get player id
  request(util.format(conf.id_url, region, region, name))
  .then(function(body) {
    name = name.toLowerCase().replace(/ /g,'')
    id = JSON.parse(body)[name]["id"]
    platform = conf.platforms[region]
    
    // get current game
    request(util.format(conf.current_game_url, region, platform, id))
    .then(function(body) {
      data = JSON.parse(body)
      res.json(data)
    })
  })
})  

app.get("/api/tilt/:region/:id", function(req, res, next) {

  var region = req.params.region
  var id = req.params.id

  // get game history
  request(util.format(conf.game_url, region, region, id))
  .then(function(body) {
    var data = JSON.parse(body)
    
    //check data
    console.log(data)
    
    // check dates. is this the first game today? determine recent games
    for (i = 0; i < data.games.length; i++) {
      if (i + 1 < data.games.length) {
        gameA = data.games[i].createDate
        gameB = data.games[i + 1].createDate
        difference = (gameA - gameB) / 3600000
      }
    }

    // more deaths than usual recently
    // playing champs you're not used to because they beat you previously
    // on hot streak, on loss streak
    // recently switched from winning to losing, vice versa
    // banned champs who won previously
    // how often someone is banned, chat banned, etc.
    // increasingly negative k/d
    // playing new champ e.g. bad lobby, favorite banned, etc.
    // strange picks or team comp

    // win, loss, kill, death
    wins = 0
    kds = []
    for (i=0; i < data.games.length; i++) {
      if (data.games[i].stats.win) {
        wins += 1
      }
      kills = data.games[i].stats.championsKilled
      deaths = data.games[i].stats.numDeaths
      if (kills == null) {
        kills = 0
      }
      if (deaths == null) {
        deaths = 0
      }
      kds.push(kills / deaths)
      //console.log(kills, deaths, kills / deaths)
      }
    wl = wins / 10 
    kd = kds.reduce(function(a, b){return a + b})
    //console.log("kd:", kd)
    //console.log("wl:", wl)


    res.json(data)
  })
})

app.listen(3000, function() {
  console.log("Server listening on", 3000);
});
