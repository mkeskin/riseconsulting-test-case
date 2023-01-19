var http = require('http')
var url = require('url')
var port = process.env.PORT || 3001

var priorities = [
  {
    key: '3-urgent',
    name: 'Urgent',
  },
  {
    key: '2-regular',
    name: 'Regular',
  },
  {
    key: '1-trivial',
    name: 'Trivial',
  },
]

//create a server object:
http
  .createServer(function (req, res) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Max-Age': 2592000, // 30 days
      'Content-Type': 'application/json',
      /** add other headers as per requirement */
    }

    const path = url.parse(req.url).pathname

    if (path === '/priorities') {
      res.writeHead(200, headers)
      res.write(JSON.stringify(priorities))
    }

    res.end()
  })
  .listen(port, function () {
    console.log('Server started at port ' + port)
  })

module.exports = {
  priorities,
}
