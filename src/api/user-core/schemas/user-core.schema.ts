import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserCoreDocument = UserCore & Document;

@Schema()
export class UserCore {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  username: string;

  @Prop()
  gender: string;

  @Prop()
  password: string;
}

export const UserCoreSchema = SchemaFactory.createForClass(UserCore);
