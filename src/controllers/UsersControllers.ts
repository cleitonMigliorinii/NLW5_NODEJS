import { Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";


class UsersControllers {

    async create(request: Request, response: Response): Promise<Response>{
        const {email} = request.body;
      
        const usersServices = new UsersServices();

        const users = await usersServices.create(email);
    
        return response.json(users);
            
    }

}

export { UsersControllers }