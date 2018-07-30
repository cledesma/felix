let express = require('express')
let app = express()
let server = app.listen(3000)
app.use(express.static('public'))
let socket = require('socket.io')
let io = socket(server)
io.sockets.on('connection', newConnection)

function newConnection(socket) {
    console.log("new connection: " + socket.id ) 
    socket.on('mouse', handleMouse)
    function handleMouse(data) {
        console.log(data.x, data.y)
        socket.broadcast.emit('mouse', data)
    }
}

app.get('/express_test', function(req,res){
    res.send('Hello World')
})