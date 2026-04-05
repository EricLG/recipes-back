import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator'

import { UserRole } from '../../../domain/user/enums/user-role.enum'

export class CreateUserDto {

    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    @MinLength(6)
    password: string

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ChangePasswordDto {

    @IsString()
    @MinLength(6)
    oldPassword: string

    @IsString()
    @MinLength(6)
    newPassword: string

}

export class UserResponseDto {

    id: string
    email: string
    name: string
    role: UserRole
    createdAt: Date
    updatedAt: Date

}
