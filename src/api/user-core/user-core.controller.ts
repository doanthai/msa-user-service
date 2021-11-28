import { Body, CacheKey, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserCoreDto } from './dto/create-user-core.dto';
import { UserCore } from './schemas/user-core.schema';
import { UserCoreService } from './user-core.service';

@ApiTags('user-core')
@Controller('user-core')
export class UserCoreController {
  constructor(private readonly userCoreService: UserCoreService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserCore,
  })
  async register(
    @Body() createUserCoreDto: CreateUserCoreDto,
  ): Promise<UserCore> {
    return await this.userCoreService.create(createUserCoreDto);
  }

  @Get()
  @CacheKey('user_cores')
  @ApiResponse({
    status: 200,
    description: 'List user cores saved in database',
    isArray: true,
    type: [UserCore],
  })
  async findAll(): Promise<UserCore[]> {
    return this.userCoreService.findAll();
  }
}
