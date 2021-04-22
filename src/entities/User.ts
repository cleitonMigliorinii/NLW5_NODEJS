import {Entity, Column, PrimaryColumn, UpdateDateColumn, CreateDateColumn, } from "typeorm"

import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    constructor(){
        !this.id && (this.id = uuid())
    }

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;
   
}

export {User}