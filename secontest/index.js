const { io } = require("socket.io-client")



let mysoket=io("http://localhost:3001/proximidad")

mysoket.emit("getproximidad:getdata",3300)


mysoket.on("getproximidad:senddata",(data)=>{
    console.log(data.values)
})