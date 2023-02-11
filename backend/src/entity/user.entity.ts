import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'password' })
  password: string;

  @Column('character varying', { name: 'email', unique: true })
  email: string;

  @Column({
    name: 'accesses_at',
    type: 'timestamp without time zone',
    default: null,
  })
  accessedAt: Date | null;

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
