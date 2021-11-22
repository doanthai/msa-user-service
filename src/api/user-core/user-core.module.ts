import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCoreController } from './user-core.controller';
import { UserCore, UserCoreSchema } from './schemas/user-core.schema';
import { UserCoreService } from './user-core.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCore.name, schema: UserCoreSchema },
    ]),
  ],
  controllers: [UserCoreController],
  providers: [UserCoreService],
})
export class UserCoreModule {}
