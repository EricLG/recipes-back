import { INestApplication } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'

describe('AppController', () => {
    let appController: AppController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile()

        appController = app.get<AppController>(AppController)
    })

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!')
        })
    })
})

describe('Health endpoint authentication', () => {
    let app: INestApplication<App>

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
        }).compile()
        app = module.createNestApplication()
        app.setGlobalPrefix('api')
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    it('returns a minimal health response without a JWT', async () => {
        await request(app.getHttpServer()).get('/api/health').expect(200).expect('OK')
    })
})
