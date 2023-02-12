import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from '../entity/tweet.entity';

@Injectable()
export class TweetRepository extends Repository<Tweet> {
  constructor(public dataSource: DataSource) {
    super(Tweet, dataSource.createEntityManager());
  }
  //ただSQLを書くのではなく、TypeORMのQueryBuilderを使って書くこともできるよ！という紹介です。理解する必要はありません！
  async searchByQueryBuilder(text: string): Promise<Tweet[]> {
    let tweetQueryBuilder = this.dataSource
      .getRepository(Tweet)
      .createQueryBuilder('tweet');

    //QueryBuilderでSQLを生成
    tweetQueryBuilder = tweetQueryBuilder
      .leftJoinAndSelect('tweet.user', 'user') //usersテーブルを結合
      .where(`tweet.content like :text`, { text: `%${text}%` }) //SQLのWhere句の生成(LIKE句で部分一致検索)
      .orderBy('tweet.createdAt', 'DESC')
      .take(100);

    //ログに実際に実行されているSQLを表示
    console.log(tweetQueryBuilder.getSql(), '-----sqlllllllll-----');

    const tweerList: Tweet[] = await tweetQueryBuilder.getMany();
    return tweerList;
  }
}
