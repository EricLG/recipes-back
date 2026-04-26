import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ThrottlerGuard, Throttle } from '@nestjs/throttler'

import { Public } from '../../../common/decorators/public.decorator'
import { LoginDto } from '../dto/user.dto'
import { AuthService, AuthResponse } from '../services/auth.service'

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Throttle({ long: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
    async login(@Body() login: LoginDto): Promise<AuthResponse> {
        return this.authService.login(login)
    }

}
