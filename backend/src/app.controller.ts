import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'モニター全情報取得' })
  @ApiResponse({ status: 200 })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
