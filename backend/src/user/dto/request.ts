import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString({ message: 'nameは文字です' })
  @IsNotEmpty({ message: 'nameは必須です' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'emailはメールアドレスです' })
  @IsNotEmpty({ message: 'emailは必須です' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'passwordは文字です' })
  @IsNotEmpty({ message: 'passwordは必須です' })
  password: string;
}

export class LoginDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'emailはメールアドレスです' })
  @IsNotEmpty({ message: 'emailは必須です' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'passwordは文字です' })
  @IsNotEmpty({ message: 'passwordは必須です' })
  password: string;
}
