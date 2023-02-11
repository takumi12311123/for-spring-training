import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity('users')
export class User {
  //データベースでいうautoincrement
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'password' })
  password: string;

  //unique設定をしている
  @Column('character varying', { name: 'email', unique: true })
  email: string;

  //デフォルト値をnullに
  @Column({
    name: 'accesses_at',
    type: 'timestamp without time zone',
    default: null,
  })
  accessedAt: Date | null;

  //1対多の関係の記述、カスケードの記述(多対1の関係では記述方法が異なるので注意)
  @OneToMany(() => Tweet, (tweet) => tweet.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  userTweetList: Tweet[];

  constructor(
    name: string,
    password: string,
    email: string,
    accessedAt: Date | null,
  ) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.accessedAt = accessedAt;
  }
}
