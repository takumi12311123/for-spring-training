import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from '../entity/tweet.entity';

@Injectable()
export class TweetRepository extends Repository<Tweet> {
  constructor(public dataSource: DataSource) {
    super(Tweet, dataSource.createEntityManager());
  }
}
