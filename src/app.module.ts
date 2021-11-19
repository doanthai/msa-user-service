import { Module } from '@nestjs/common';
import { MsaConfigModule } from 'msa-util';

@Module({
  imports: [
    MsaConfigModule.register({
      folder: 'env',
      env: 'local',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
