import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCoreDto {
  @ApiProperty()
  readonly phone: string;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
}
