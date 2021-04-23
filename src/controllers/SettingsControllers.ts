import { Request, Response } from "express";
import { SettingsServices } from "../services/SettingsServices";


class SettingsControllers {

    async create(request: Request, response: Response){
        const {chat, username} = request.body;
      
        const settingsServices = new SettingsServices();

        try{
            const settings = await settingsServices.create({chat, username})
    
            return response.json(settings);
        }catch(err) {
            return response.status(400).json({
                code: 400,
                message: err.message
            })
        }
        
    }

    async findByUsername(request: Request, response: Response){

        const { username } = request.params;

        const settingsService = new SettingsServices();

        const settings = await settingsService.findByUsername(username);

        return response.json(settings);

    }

    async update(request: Request, response: Response){

        const { username } = request.params;
        const { chat } = request.body;
        console.log(username + chat)

        const settingsService = new SettingsServices();

        const settings = await settingsService.update(username, chat);

        return response.json(settings);

    }
}

export { SettingsControllers }