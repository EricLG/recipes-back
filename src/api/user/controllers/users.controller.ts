import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { Roles } from '../../../common/decorators/roles.decorator'
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard'
import { UserRole } from '../../../domain/user/enums/user-role.enum'
import { User, UserDocument } from '../../../domain/user/schemas/user.schema'
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from '../dto/user.dto'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('my-profile')
    async myProfile(@Request() req: ExpressRequest & { user: UserDocument }): Promise<User> {
        if (!req.user) {
            throw new Error('User not found in request')
        }

        return this.usersService.findOne(req.user._id.toString())
    }

    @UseGuards(JwtAuthGuard)
    @Put('my-profile/password')
    async changePassword(
        @Request() req: ExpressRequest & { user: UserDocument },
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        return this.usersService.changePassword(req.user._id.toString(), changePasswordDto)
    }

    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Roles(UserRole.ADMIN)
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Roles(UserRole.ADMIN)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(id, updateUserDto)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id)
    }

}
