var request = require("request-promise")
var util = require("util")

var conf = require("./config")


url = util.format(conf.static_data, "NA1", "NA1")
console.log(url)

url2 = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=info&api_key=a74fc8d7-71b8-47b8-9440-8486f04cae9d"

request(url2)
.then(function(body) {
  champ_id = 41
  body = JSON.parse(body)
  keys = Object.keys(body.data)
  for (i = 0; i < keys.length; i++) {
    champ = body.data[keys[i]]
    if (champ.id == champ_id) {
      name = 
      console.log(keys[i])
    }
  }
})
