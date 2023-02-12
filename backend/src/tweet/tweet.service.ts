import { Injectable } from '@nestjs/common';
import { Tweet } from '../entity/tweet.entity';
import { User } from '../entity/user.entity';
import { TweetRepository } from '../repository/tweet.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class TweetService {
  constructor(
    private tweetRepository: TweetRepository,
    private userRepository: UserRepository,
  ) {}

  async getTweet(): Promise<{
    tweetList: { userName: string; content: string; createdAt: Date }[];
  }> {
    let tweetList: { userName: string; content: string; createdAt: Date }[];
    try {
      //日付が新しい順に100個取得
      const originalTweetList: Tweet[] = await this.tweetRepository.find({
        order: { createdAt: 'DESC' },
        take: 100,
        relations: { user: true },
      });

      //DTOに適した形に変換(最下部にconvertTweetListの定義あり)
      tweetList = this.convertTweetList(originalTweetList);
    } catch (e: any) {
      console.log(e);
      throw e;
    }
    return { tweetList: tweetList };
  }

  async postTweet(
    userId: number,
    content: string,
  ): Promise<{ message: '成功' }> {
    try {
      //idからツイートしたuserを取得
      const tweetUser: User = await this.userRepository.findOne({
        where: { id: userId },
      });

      //Tweetクラスのインスタンスを生成
      const newTweet: Tweet = new Tweet(content, tweetUser);

      //上で生成したインスタンスを保存(tweetsテーブルに保存される)
      await this.tweetRepository.save(newTweet);
    } catch (e: any) {
      console.log(e);
      throw e;
    }
    return { message: '成功' };
  }

  async searchTweet(text: string): Promise<{
    tweetList: { userName: string; content: string; createdAt: Date }[];
  }> {
    let tweetList: { userName: string; content: string; createdAt: Date }[];
    try {
      //TypeORMのQueryBuilderを用いた検索(詳細はtweetRepositoryを参照)
      const originalTweetList: Tweet[] =
        await this.tweetRepository.searchByQueryBuilder(text);

      tweetList = this.convertTweetList(originalTweetList);
    } catch (e: any) {
      console.log(e);
      throw e;
    }
    return { tweetList: tweetList };
  }

  //型Tweet[]をDTOに適した形に変換する関数(このサービス内のみで使用)
  private convertTweetList(
    tweetList: Tweet[],
  ): { userName: string; content: string; createdAt: Date }[] {
    const result = tweetList.map(({ content, createdAt, user }) => {
      return { userName: user.name, content: content, createdAt: createdAt };
    });

    return result;
  }
}
