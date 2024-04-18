import mqtt from "mqtt";
import bcryp from "bcrypt";
import axios from "axios";

export default (io:any,socket:any)=>{
    const getImage=async(id:number)=>{
        console.log("id",id)
        socket.join(id)
        const mqttBroker = "mqtt://52.5.255.119/mqtt-web/"; // ip o dominio
        const mqttOptions = {
            clientId: 'mqttjs_image' + bcryp.hashSync(Math.random().toString(16),10),
            username: "", // usuario MQTT
            password: "", //  contraseña MQTT
        };
        // todo implementar petecion a prodcuto par actualizar su rango
        const topic="safeplace/"+id+"/img"
        const mqttClient = mqtt.connect(mqttBroker, mqttOptions);
        mqttClient.on('connect', () => {
            console.log('Conectado al servidor MQTT');
            mqttClient.subscribe(topic);
          });
          
          mqttClient.on('message', (topic, message) => {
              let dataString = message.toString()
              const jsonData = JSON.parse(dataString);
              axios.patch("http://localhost:3003/api/producto",{
                productId:id,
                image:jsonData.urlimg
              }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
              
              io.of("/camara").to(id).emit("getimage:get",jsonData)
              
          });

          
          
    }

    

    socket.on("getimage:send",getImage)
    // socket.on("joinRoom",(idRoom:any,usuario:any) => {
    //     socket.join(idRoom)
    //    console.log("usuario",idRoom)
    // })
}