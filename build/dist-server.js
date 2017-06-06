
var config = require('../config')
var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')


// default port where dev server listens for incoming traffic
var port = 8000
// automatically open browser, if not set will be false
var autoOpenBrowser = false
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()


// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(express.static('dist'));
var uri = 'http://localhost:' + port


console.log('> Starting dev server...')

var server = app.listen(port)

module.exports = {
  // ready: readyPromise,
  close: () => {
    server.close()
  }
}
