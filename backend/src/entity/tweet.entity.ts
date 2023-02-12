import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name' })
  content: string;

  //レコードを挿入したときに、勝手にその時の時間を入れてくれる
  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt!: Date;

  //多対1の関係、カスケードの記述
  @ManyToOne(() => User, (user) => user.userTweetList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  readonly user: User;

  constructor(content: string, user: User) {
    this.content = content;
    this.user = user;
  }
}
