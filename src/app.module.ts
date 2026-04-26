import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'

import { ApiModule } from './api/api.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SchemaValidation } from './common/config/config.validator'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'
import { RolesGuard } from './common/guards/roles.guard'
import { DatabaseModule } from './database/database.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: SchemaValidation,
            validationOptions: {
                abortEarly: true,
            },
        }),
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 1000, // 1 second
                limit: 3, // 3 requests per second
            },
            {
                name: 'medium',
                ttl: 60000, // 1 minute
                limit: 30, // 30 requests per minute
            },
            {
                name: 'long',
                ttl: 60000, // 1 minute
                limit: 10, // 10 requests per minute (stricter for sensitive endpoints)
            },
        ]),
        DatabaseModule,
        ApiModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
