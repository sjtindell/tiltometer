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


app.get("/api/summary/:region/:name", function(req, res, next) {

  var region = req.params.region
  var name = req.params.name

  request(util.format(conf.id_url, region, region, name))
  .then(function(body) {
    name = name.toLowerCase().replace(/ /g,'')
    return JSON.parse(body)[name]["id"]
  })
  .then(function(id) {
    platform = conf.platforms[region]
    return request(util.format(conf.current_game_url, region, platform, id))
  })
  .then(function(body) { 
    data = JSON.parse(body)
    res.json(data)
  })
})
  

app.get("/api/tilt/:region/:id", function(req, res, next) {

  var region = req.params.region
  var id = req.params.id

  //var results = []
  //var count = 0
  //var urls = [ array of urls to store results in before res.json(results) ]

  request(util.format(conf.game_url, region, region, id))
  .then(function(body) {
    var data = JSON.parse(body)
    // check tilt
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
      console.log(kills, deaths, kills / deaths)
      }
    
    data.wins = wins
    data.kd = kds.reduce(function(a, b){return a + b})
    console.log(kds)
    res.json(data)
  })
})

app.listen(3000, function() {
  console.log("Server listening on", 3000);
});
