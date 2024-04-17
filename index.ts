import { createServer } from "http"

import "dotenv/config"
import { Server } from "socket.io"
import imagenhandler from "./src/handlers/imagenhandler"

const httpserver=createServer()
httpserver.listen(process.env.PORT||3000,()=>{
    console.log("Server is running " + 'http://localhost:' + process.env.PORT||3003)
})

const io =new Server(httpserver,{
    cors:{
        origin:"*"
    },
    pingInterval:1000,
    pingTimeout:2000,

})

const onConnection = (socket:any) => {
    console.log("new connection")
    imagenhandler(io,socket)
   
    
}

io.of("/camara").on("connection",onConnection)