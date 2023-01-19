var http = require('http')
var port = process.env.PORT || 3001

var content = [
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
  .createServer(function (_, res) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Max-Age': 2592000, // 30 days
      'Content-Type': 'application/json',
      /** add other headers as per requirement */
    }

    res.writeHead(200, headers)
    res.write(JSON.stringify(content))
    res.end()
  })
  .listen(port, function () {
    console.log('Server started at port ' + port)
  })
