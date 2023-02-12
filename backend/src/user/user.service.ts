import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import * as hasher from 'wordpress-hash-node';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<{ id: number | null; name: string | null }> {
    let newUser: User;
    try {
      //入力されたメールアドレスを持つユーザーを取得
      const existingUser: User | null = await this.userRepository.findOne({
        where: { email: email },
      });

      //existingUserが存在する=既に登録済みのユーザーが存在する　なのでnullにして返す
      if (existingUser) {
        return { id: null, name: null };
      }

      //パスワードのハッシユ化
      const hashedPassword: string = hasher.HashPassword(password);

      //ユーザーを新規作成 + 作成されたユーザーをnewUserに入れる
      newUser = await this.userRepository.save(
        new User(name, hashedPassword, email, null),
      );
    } catch (e: any) {
      console.log(e);
      throw e;
    }
    return { id: newUser.id, name: newUser.name };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ id: number; name: string }> {
    let result: { id: number; name: string };
    try {
      //入力されたメールアドレスを持つユーザーを取得
      const targetUser: User | null = await this.userRepository.findOne({
        where: { email: email },
      });

      if (!targetUser) {
        //targetUserがいない=メールアドレスが異なる　なのでnullで返す
        return { id: null, name: null };
      }

      //targetUserのpasswordと入力されたpasswordが一致するか確認(isSamePasswordにはtrueかfalseが入る)
      const isSamePassword: boolean = hasher.CheckPassword(
        password,
        targetUser.password,
      );
      if (isSamePassword) {
        result = { id: targetUser.id, name: targetUser.name };
      } else {
        return { id: null, name: null };
      }
    } catch (e: any) {
      console.log(e);
      throw e;
    }
    return result;
  }
}
