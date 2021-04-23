import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnetionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    socket_id: string,
    user_id: string,
    admin_id?: string,
    id?: string
}

class ConnectionsServices{

    private connetionsRepository: Repository<Connection>;

    constructor(){
        this.connetionsRepository = getCustomRepository(ConnetionsRepository);
    }

    async create({socket_id, user_id, admin_id, id} :IConnectionCreate){
        
        const connection = this.connetionsRepository.create({
            socket_id, 
            user_id, 
            admin_id, 
            id
        });

        await this.connetionsRepository.save(connection);

        return connection;

    }

    async findByUserId(user_id: string){

        const connection = await this.connetionsRepository.findOne({user_id});

        return connection;
    }

}

export {ConnectionsServices}