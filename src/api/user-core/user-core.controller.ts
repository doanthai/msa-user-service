import { Body, CacheKey, Controller, Get, Post } from '@nestjs/common';
import { CreateUserCoreDto } from './dto/create-user-core.dto';
import { UserCore } from './schemas/user-core.schema';
import { UserCoreService } from './user-core.service';

@Controller('user-core')
export class UserCoreController {
  constructor(private readonly userCoreService: UserCoreService) {}

  @Post()
  async register(
    @Body() createUserCoreDto: CreateUserCoreDto,
  ): Promise<UserCore> {
    return await this.userCoreService.create(createUserCoreDto);
  }

  @Get()
  @CacheKey('user_cores')
  async findAll(): Promise<UserCore[]> {
    return this.userCoreService.findAll();
  }
}
