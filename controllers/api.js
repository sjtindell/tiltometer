var router = require("express").Router()
var request = require("request-promise")
var path = require("path")
var conf = require("./config")
var util = require("util")


router.get("/api/current/:region/:name", function(req, res, next) {

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
    .catch(function(err) {
      console.log("crawl failed")
      console.log(err)
    })
  })
  .catch(function(err) {
    console.log("crawl failed")
    console.log(err)
  }) 
})  


router.get("/api/history/:region/:id", function(req, res, next) {

  var region = req.params.region
  var id = req.params.id

  // get game history
  request(util.format(conf.game_url, region, region, id))
  .then(function(body) {
    data = JSON.parse(body)
    res.json(data)

  })
})

router.get("/api/champ/:region", function(req, res, next) {

  var region = req.params.region
  var champId = req.params.id

  request(util.format(conf.static_data_url, "global", region))
  .then(function(body) {
    data = JSON.parse(body)
    res.json(data)
  })
})

module.exports = router
