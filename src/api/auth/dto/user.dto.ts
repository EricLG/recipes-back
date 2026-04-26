import { IsEnum, IsString } from 'class-validator'

import { UserRole } from '../../../domain/user/enums/user-role.enum'

export class LoginDto {

    @IsString()
    email: string

    @IsString()
    password: string

}

export class UserDto extends LoginDto {

    @IsString()
    name: string

    @IsEnum(UserRole)
    role: UserRole

}
