const express =  require("express")
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const PORT = 5100;
app.use(express.json())
app.get('/',(req,res) =>{
  // res.render("/views/index.html",{title: "Forum Chat"})
  res.sendFile(__dirname + "/views/index.html");
})

io.on("connection", (socket) =>{
  // socket io menangkap data yang dikirim kan berdasarkan nama message 
  socket.on("message", (data) =>{
    // console.log('data =>', data)
    const {id, message} = data
    // socket io membagikan data message yang didapat ke semua user
    socket.broadcast.emit('message', id,message)
  })
})
server.listen(PORT, () =>{
  console.log(`Server berhasil dijalankan di Port  ${PORT}`)
})