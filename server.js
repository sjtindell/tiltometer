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
    url = conf.current_game_url
    platform = conf.platforms[region]
    return request(util.format(url, region, platform, id))
  })
  .then(function(body) {
    data = JSON.parse(body)
    res.status(201).send(data);
  })  
});

app.get("/api/tilt/:region/:id", function(req, res, next) { 
  var region = req.params.region
  var id = req.params.id
  
  var player = {}
  var results = []
  var count = 0
  var urls = [
    util.format(conf.matchlist_url, region, region, id),
    util.format(conf.game_url, region, region, id)
  ]

  for (i=0; i < urls.length; i++) {
    console.log(urls[i])
    request(urls[i])
    .then(function(body) {
      results.push(body)
      count += 1
      if (count == urls.length) {
        console.log("sending results")
        res.json(results)
      }
    })
  }
})


app.listen(3000, function() {
  console.log("Server listening on", 3000);
});
