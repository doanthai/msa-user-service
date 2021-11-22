import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
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
    MsaLoggerModule,
    ...customModules,
  ],
})
export class AppModule {}
