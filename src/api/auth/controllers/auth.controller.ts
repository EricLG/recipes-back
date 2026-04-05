import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { Public } from '../../../common/decorators/public.decorator'
import { LoginDto } from '../dto/user.dto'
import { AuthService, AuthResponse } from '../services/auth.service'

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() login: LoginDto): Promise<AuthResponse> {
        return this.authService.login(login)
    }

}
