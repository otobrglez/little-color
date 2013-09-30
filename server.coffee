port = ()->
  process.env.LISTEN_PORT || 5000

express = require "express"

app = express()
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.engine('jade', require("jade").__express)
app.use express.static(__dirname + '/public')

app.get "/", (req,res)->
  res.render "index"

app.get "/:code", (req,res)->
  res.render "code",
    code: req.params.code || null

io = require('socket.io').listen app.listen(port())
io.set 'log level', 3

io.sockets.on 'connection', (socket)->
  socket.on 'set_color', (data)->
    io.sockets.emit("code:#{data.code}", data) if data.code?

  socket.on 'message', (data)->
    console.log "Message..."

  socket.on 'disconnect', (data)->
    console.log "Client disconnect."
