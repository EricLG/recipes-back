import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from '../../../domain/user/schemas/user.schema'
import { CreateUserDto, ChangePasswordDto, UpdateUserDto } from '../dto/user.dto'

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec()
        if (existingUser) {
            throw new BadRequestException('Email already in use')
        }

        const user = await this.userModel.create(createUserDto)
        return this.findOne(user.id)
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password').exec()
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).select('-password').exec()
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async findOneByEmail(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email }).exec()
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findById(id).exec()
        if (!user) {
            throw new NotFoundException('User not found')
        }

        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.userModel.findOne({ email: updateUserDto.email }).exec()
            if (existingUser) {
                throw new BadRequestException('Email already in use')
            }
        }

        Object.assign(user, updateUserDto)
        await user.save()
        return this.findOne(id)
    }

    async remove(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec()
        if (!result) {
            throw new NotFoundException('User not found')
        }
    }

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
        const { oldPassword, newPassword } = changePasswordDto
        const user = await this.userModel.findById(userId).exec()
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isCurrentPasswordValid = await user.comparePassword(oldPassword)
        if (!isCurrentPasswordValid) {
            throw new BadRequestException('Current password is incorrect')
        }

        user.password = newPassword
        await user.save()
    }

}
