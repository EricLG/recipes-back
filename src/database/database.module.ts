import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Migration, MigrationSchema } from './migrations/migration.schema'
import { MigrationService } from './migrations/migration.service'

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
        MongooseModule.forFeature([{ name: Migration.name, schema: MigrationSchema }]),
    ],
    providers: [MigrationService],
    exports: [MongooseModule],
})
export class DatabaseModule {}
