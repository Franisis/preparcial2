import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {UserDto} from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
    ){}

    async create(userDto:UserDto)
    {
        try {
            console.log(userDto)
            const user = await this.userRepository.save(userDto);
            console.log(user);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
            
        }
        
    }

    async findOne(id:number)
    {
        if (id)
            {
                return this.userRepository.findOneBy({id});
            }
            else
            {
                throw new Error('User id is required');
            }
    }
    async findAll()
    {
        return this.userRepository.find();
    }
}
