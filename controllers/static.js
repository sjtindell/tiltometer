var express = require("express")
var router = require("express").Router()
var path = require("path")


router.use(express.static(__dirname + "/../assets"))

router.get("/", function(req, res) {
  res.sendFile(path.resolve("app.html"))
})

module.exports = router
