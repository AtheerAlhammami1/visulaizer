import cors from 'cors'
import dgram from 'dgram'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const udpServer = dgram.createSocket('udp4')
const PORT = 9001 // sender 9001
const HOST = '127.0.0.1'
udpServer.bind(PORT, HOST);

udpServer.on('listening',()=> console.log('udp server listening'));
udpServer.on('message', (msg, rinfo) => { // Receives from java on 9001
  console.log(`Received ${msg.length} bytes from ${rinfo.address}:${rinfo.port}`);
  let message = msg.toString().substring(1, msg.toString().length-2);
  console.log("msg:"+message);
  if(msg.toString().includes("radarId")){
    io.emit('udp-message', message);
  }else{
    console.log("this is a radar meesage");
  }
});

// Expose an HTTP endpoint that can be called from the Vue.js frontend
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
    origin: 'http://127.0.0.1:5173'
}));


app.post('/send-udp', (req, res) => {
  const message = 'Hello, UDP!';
  console.log('UDP message sent');
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
});

server.listen(3000, () => { // listen to vuejs
  console.log('HTTP server listening on port 3000');
});