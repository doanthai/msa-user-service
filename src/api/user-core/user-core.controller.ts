import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserCoreDto } from './dto/create-user-core.dto';
import { UserCore } from './schemas/user-core.schema';
import { UserCoreService } from './user-core.service';

@Controller()
export class UserCoreController {
  constructor(private readonly userCoreService: UserCoreService) {}

  @Post()
  async register(
    @Body() createUserCoreDto: CreateUserCoreDto,
  ): Promise<UserCore> {
    return await this.userCoreService.create(createUserCoreDto);
  }

  @Get()
  async findAll(): Promise<UserCore[]> {
    return this.userCoreService.findAll();
  }
}
