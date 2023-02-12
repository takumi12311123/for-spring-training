import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @ApiProperty({ nullable: true })
  id: number | null;

  @ApiProperty({ nullable: true })
  name: string | null;
}

export class LoginResponse extends CreateUserResponse {}
