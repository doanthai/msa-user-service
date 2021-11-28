import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import {
  cachingFactory,
  mongoFactory,
  MsaConfigModule,
  MsaLogger,
  MsaLoggerModule,
} from 'msa-util';
import { UserCoreModule } from './api';
import { HealthModule } from './api/health';

const customModules = [UserCoreModule, HealthModule];

const configOptions = {
  folder: 'env',
  isGlobal: true,
};

@Module({
  imports: [
    MsaConfigModule.register(configOptions),
    MongooseModule.forRootAsync({
      imports: [MsaConfigModule, MsaLoggerModule],
      useFactory: mongoFactory,
      inject: [ConfigService, MsaLogger],
    }),
    CacheModule.registerAsync({
      imports: [MsaConfigModule],
      useFactory: cachingFactory,
      inject: [ConfigService],
      isGlobal: true,
    }),
    MsaLoggerModule,
    ...customModules,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
