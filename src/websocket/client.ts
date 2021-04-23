import {io} from "../http";
import { ConnectionsServices } from "../services/ConnectionsService";
import { UsersServices } from "../services/UsersServices";
import { MessagesServices } from "../services/MessagesServices";

interface Iparams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {

    const  connectionsServices = new  ConnectionsServices();
    const  usersServices = new  UsersServices();
    const messagensServices = new MessagesServices();

    socket.on("client_first_access", async (params) => {
        
      const socket_id = socket.id;
      const {text, email} = params as Iparams;
      let user_id = null;

      const userExists = await usersServices.findByEmail(email);

      if(!userExists){
        const user = await usersServices.create(email);
        user_id = user.id;
        await connectionsServices.create({
            socket_id, 
            user_id : user.id
        })
      }else{

        const connection = await connectionsServices.findByUserId(userExists.id);

        if(!connection){
            await connectionsServices.create({
                socket_id, 
                user_id : userExists.id
            })
    
        }else{
            connection.socket_id = socket_id;
            await connectionsServices.create(connection);

        }

        user_id = userExists.id;
      }

      await messagensServices.create({
          text,
          user_id
      })
     


    });



});

