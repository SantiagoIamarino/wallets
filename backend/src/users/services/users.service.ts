import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async findUser(username): Promise<User> {

        return this.userModel.findOne({username})

    }

    async createUser(userData: CreateUserDto): Promise<User> {
        
        const user = new this.userModel(userData)
        return await user.save()

    }

    async updateUser(userId, userData: CreateUserDto): Promise<User> {

        return await this.userModel.findByIdAndUpdate(userId, userData)

    }

}
