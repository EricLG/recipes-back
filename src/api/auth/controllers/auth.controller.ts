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
    @Throttle({
        short: { limit: 3, ttl: 1000 },
        medium: { limit: 10, ttl: 60000 },
        long: { limit: 50, ttl: 3600000 },
    })
    @Post('login')
    async login(@Body() login: LoginDto): Promise<AuthResponse> {
        return this.authService.login(login)
    }

}
