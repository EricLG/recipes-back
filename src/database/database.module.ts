import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Global()
@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    uri: config.get<string>('MONGODB_URI'),
                    retryAttempts: 5,
                    retryDelay: 5000,
                }
            },
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
