import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TweetService } from './tweet.service';
import {
  GetTweetResponse,
  SearchTweetResponse,
  PostTweetResponse,
} from './dto/response';
import { PostTweetDTO, SearchTweetDTO } from './dto/request';

//@Controller()と@Post()の引数でルーティングを記述
@ApiTags('tweets')
@Controller('tweets')
export class TweetController {
  //TweetServiceを使うための記述
  constructor(private readonly tweetService: TweetService) {}

  @ApiOperation({ summary: 'ツイート取得' })
  @ApiResponse({ status: 200, type: GetTweetResponse })
  @HttpCode(200)
  @Get()
  async getTweet(): Promise<GetTweetResponse> {
    const res = await this.tweetService.getTweet();
    return res;
  }

  @ApiOperation({ summary: 'ツイート投稿' })
  @ApiResponse({ status: 200, type: PostTweetResponse })
  @HttpCode(200)
  @Post()
  async postTweet(
    @Body() { id, content }: PostTweetDTO,
  ): Promise<PostTweetResponse> {
    const res = await this.tweetService.postTweet(id, content);
    return res;
  }

  @ApiOperation({ summary: 'ツイート検索' })
  @ApiResponse({ status: 200, type: SearchTweetResponse })
  @HttpCode(200)
  @Post('search')
  async searchTweet(
    @Body() { text }: SearchTweetDTO,
  ): Promise<SearchTweetResponse> {
    const res = await this.tweetService.searchTweet(text);
    return res;
  }
}
