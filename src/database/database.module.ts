import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const user = config.get<string>('MONGODB_USER');
                const pwd = config.get<string>('MONGODB_PWD');
                const host = config.get<string>('MONGODB_HOST');

                return {
                    uri: 'mongodb://' + user + ':' + pwd + '@' + host + '/recipes?authSource=recipes',
                    retryAttempts: 5,
                    retryDelay: 5000,
                };
            },
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
