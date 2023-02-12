import { ApiProperty } from '@nestjs/swagger';

class Tweet {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;
}

export class GetTweetResponse {
  @ApiProperty({ isArray: true, type: Tweet })
  tweetList: Tweet[];
}

export class SearchTweetResponse extends GetTweetResponse {}

export class PostTweetResponse {
  @ApiProperty()
  message: '成功';
}
