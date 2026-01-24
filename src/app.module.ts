import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, ApiModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
