import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoFactory, MsaConfigModule } from 'msa-util';
import { UserCoreModule } from './api';

const customModules = [UserCoreModule];

const configOptions = {
  folder: 'env',
  isGlobal: true,
};

@Module({
  imports: [
    MsaConfigModule.register(configOptions),
    MongooseModule.forRootAsync({
      imports: [MsaConfigModule],
      useFactory: mongoFactory,
      inject: [ConfigService],
    }),
    ...customModules,
  ],
})
export class AppModule {}
