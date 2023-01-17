var http = require('http')
var port = process.env.PORT || 3001

var content = [
  {
    key: 'urgent',
    name: 'Urgent',
  },
  {
    key: 'regular',
    name: 'Regular',
  },
  {
    key: 'trivial',
    name: 'Trivial',
  },
]

//create a server object:
http
  .createServer(function (_, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(content))
    res.end()
  })
  .listen(port, function () {
    console.log('Server started at port ' + port)
  })
