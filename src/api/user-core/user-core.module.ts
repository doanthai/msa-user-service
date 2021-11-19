import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCore,
  UserCoreSchema,
} from 'src/api/user-core/schemas/user-core.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCore.name, schema: UserCoreSchema },
    ]),
  ],
})
export class UserCoreModule {}
