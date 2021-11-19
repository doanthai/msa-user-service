import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserCoreDto } from './dto/create-user-core.dto';
import { UserCore, UserCoreDocument } from './schemas/user-core.schema';

@Injectable()
export class UserCoreService {
  constructor(
    @InjectModel(UserCore.name)
    private readonly userCoreModel: Model<UserCoreDocument>,
  ) {}

  async create(createUserCoreDto: CreateUserCoreDto): Promise<UserCore> {
    return await this.userCoreModel.create(createUserCoreDto);
  }

  async findAll(): Promise<UserCore[]> {
    return this.userCoreModel.find().exec();
  }
}
