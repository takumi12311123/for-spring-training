import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserResponse, LoginResponse } from './dto/response';
import { CreateUserDTO, LoginDTO } from './dto/request';

//@Controller()と@Post()の引数でルーティングを記述
@ApiTags('users')
@Controller('users')
export class UserController {
  //UserServiceを使うための記述
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '新規登録' })
  @ApiResponse({ status: 200, type: CreateUserResponse })
  @HttpCode(200)
  @Post('create')
  async createUser(
    @Body() { name, email, password }: CreateUserDTO,
  ): Promise<CreateUserResponse> {
    return;
  }

  @ApiOperation({ summary: 'ログイン' })
  @ApiResponse({ status: 200, type: LoginResponse })
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: LoginDTO): Promise<LoginResponse> {
    return;
  }
}
