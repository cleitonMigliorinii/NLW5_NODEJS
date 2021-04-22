import { Request, Response } from "express";
import { MessagesServices } from "../services/MessagesServices";


class MessagesControllers {

    async create(request: Request, response: Response) {
        const {admin_id, text, user_id} = request.body;
      
        const messagesServices = new MessagesServices();

        const message = await messagesServices.create( {
                admin_id,
                text,
                user_id
        });
    
        return response.json(message);
            
    }

    async showByUser(request: Request, response: Response) {
        const { id } = request.params;
      
        const messagesServices = new MessagesServices();

        const list = await messagesServices.listByUsers(id);
    
        return response.json(list);
            
    } 


}

export { MessagesControllers }