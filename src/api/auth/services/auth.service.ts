import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserRole } from '../../../domain/user/enums/user-role.enum'
import { User } from '../../../domain/user/schemas/user.schema'
import { UsersService } from '../../user/services/users.service'
import { LoginDto } from '../dto/user.dto'

export interface AuthResponse {
    access_token: string
    user: {
        id: string
        email: string
        name: string
        role: UserRole
    }
}

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(login: LoginDto): Promise<AuthResponse> {
        const { email, password } = login
        const user = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = { sub: user.id as string, email: user.email, role: user.role }
        const access_token = this.jwtService.sign(payload)

        console.debug('User logged in:', { email: user.email })

        return {
            access_token,
            user: {
                id: user.id as string,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        }
    }

    async getProfile(userId: string): Promise<User> {
        const user = await this.usersService.findOne(userId)
        if (!user) {
            throw new UnauthorizedException('User not found')
        }
        return user
    }

}
