import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersServices{

    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }
    
    async create(email:string){
        const usersRepository = getCustomRepository(UsersRepository);

        const userExists = await this.usersRepository.findOne({email})

        if(userExists) {
            return userExists;
        }
       
        const users = this.usersRepository.create({ email });
    
        await this.usersRepository.save(users);

        return users;
    
    }

    async findByEmail(email){
        return await this.usersRepository.findOne({email});
    }

}

export {UsersServices};