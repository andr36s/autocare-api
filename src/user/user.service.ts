import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async create(userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.model({...userDTO, password: hash});
        return await newUser.save();
    }

    async findAll(): Promise<IUser[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IUser> {
        const user = await this.model.findById(id);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        return user;
    }

    async update(id: string, userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password);
        const updatedUser = { ...userDTO, password: hash };
        const user = await this.model.findByIdAndUpdate(id, updatedUser, {new: true});

        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        
        return user;
    }

    async delete(id: string): Promise<IUser> {
        const user = await this.model.findByIdAndDelete(id);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        
        return user;
    }
}
