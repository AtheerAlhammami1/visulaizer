let dgram = require('dgram')
const udpServer = dgram.createSocket('udp4')
const PORT = 9101 // sender 9101
const HOST = '127.0.0.1'
udpServer.bind(PORT, HOST)

udpServer.on('listening', () => console.log('udp server listening'))
udpServer.on('message', (msg, rinfo) => {
  let meesage = msg.toString()
  console.log('meesage to strin' + meesage)
  if(meesage.includes("note")){
    io.emit('udp-incidentReportMessage',meesage);
  }else{
      io.emit('udp-message', meesage)
  }
})

// Expose an HTTP endpoint that can be called from the Vue.js frontend
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:5173','http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
})

const cors = require('cors')
app.use(
  cors({
        origin: ['http://localhost:5173','http://127.0.0.1:5173'],
  })
)

app.post('/send-udp', (req, res) => {
  const message = 'Hello, UDP!'
  console.log('UDP message sent')
  //  io.emit('udp-message', message);
  //   udpServer.send(message, 0, message.length, PORT, 'localhost', (err) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('Error sending UDP message');
  //     } else {
  //       console.log('UDP message sent');
  //       res.send('UDP message sent');
  //     }
  //   });
})

server.listen(3000, () => {
  // listen to vuejs
  console.log('HTTP server listening on port 3000')
})
