import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { Model } from 'mongoose'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User, UserDocument } from '../../../domain/user/schemas/user.schema'

export interface JwtPayload {
    sub: string
    email: string
    role: string
    iat?: number
    exp?: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET') as string,
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { sub: userId } = payload
        const user = await this.userModel.findById(userId).exec()
        if (!user) {
            console.error(`[JwtStrategy] User not found in database: ${userId}`)
            throw new UnauthorizedException('User not found')
        }
        return user
    }

}
