import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TweetRepository } from '../repository/tweet.repository';
import { UserRepository } from '../repository/user.repository';

@Module({
  controllers: [TweetController],
  providers: [TweetService, TweetRepository, UserRepository], //TweetRepositoryをprovidersに記述
})
export class TweetModule {}
