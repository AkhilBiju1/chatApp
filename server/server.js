const express = require("express")
const session = require('express-session')
 const cors = require ("cors")   
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const db = require('./connection/connection')




app.use(bodyParser.json());
app.use(session({ secret: "key",resave:false,saveUninitialized:false, cookie: { maxAge: 1800000 } }))
app.use('/', userRouter);
app.use(cors())
const server = http.createServer(app)


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
})


io.on('connection', socket => {
 
    socket.on("join_room", (data) => {
        socket.join(data)

        console.log("room id "+data);
    })

    
    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message",data)
    })
});

db.connect();
server.listen(5000,()=>{console.log('server started on 5000');})