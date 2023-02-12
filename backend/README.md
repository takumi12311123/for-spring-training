# バックエンド手順書

1.  TablePlus(データベース管理ソフトウェア)のインストール<br/>
    https://tableplus.com/

2.  VSCode で for-spring-training を開く

3.  ターミナルを開いて、for-spring-training 上でコンテナ起動
    ```
    docker-compose up
    ```
4.  起動を待つ(ターミナルに「Nest application successfully started 」と表示が出れば ok、結構時間がかかります)

5.  twitter_api コンテナ内で、以下のコマンドを叩く

    ```
    npm i -g @nestjs/cli ts-node
    ```

6.  今回作るアプリの仕様
    <p>作るもの：簡易版 Twitter</p>
    機能一覧</br>
    1. ユーザー登録機能</br>
    2. ログイン機能</br>
    3. ツイート投稿機能</br>
    4. ツイート表示機能</br>
    5. ツイート検索機能</br>

    <p>テーブル定義</p>

    <p>

    | users       |
    | ----------- |
    | id          |
    | name        |
    | password    |
    | email       |
    | accessed_at |

    | tweets     |
    | ---------- |
    | id         |
    | content    |
    | created_at |
    | user_id    |

    </p>

7.  entity の作成<br/>

    1.  entity って？<br/>
        データベースにおけるテーブルの役割。今回は TypeScript のクラス + TypeORM(後述)の書き方で書きます
    2.  ファイルの作成<br/>
        backend/src/entity 内に「user.entity.ts」「tweet.entity.ts」の二つを作成
    3.  backend/src/entity/user.entity.ts に下のコードをコピー(エラーが出ても気にしないでください)

        ```typescript
        import {
          Entity,
          PrimaryGeneratedColumn,
          Column,
          OneToMany,
        } from 'typeorm';
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
        ```

    4.  backend/src/entity/tweet.entity.ts に下のコードをコピー(エラーが消えるはずです)

        ```typescript
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
          @CreateDateColumn({
            name: 'created_at',
            type: 'timestamp without time zone',
          })
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
        ```

    5.  解説 <br/>
        <p>今回は TypeORM という ORM を用いてバックエンドを書いていきます。詳しくは説明しませんが、データベースとのやりとりをいい感じにやってくれるものという認識で大丈夫です。具体的に言うと、SQLを書かなくてもデータベースにアクセスできたりします。(裏ではSQLが走ってます)上のコードでは TypeORM の書き方でデータベースのテーブルを定義しています。@~~Columnで定義されたものがテーブルのカラムになっているので、上のテーブル定義と見比べてみてください。リレーションの指定も出来て、ここでは@OneToMany, @ManyToOneを用いた一対多の関係を記述しています。</p>

    6.  TablePlus の接続</br>
        <p>TablePlusを開いて、create a new connection... → PostgreSQL → create の順に押して、下記の接続情報を入力してください(他はいじらないでください)</p>
        <p>
        Name: twitter</br>
        Port: 5432</br>
        User: postgres</br>
        Password: postgres</br>
        Database: twitter</br>
        </p>
        <p>上を入力後、Connectを押してください。画面が切り替わり、左側に先ほど作ったentity通りのテーブルが作成されているはずです。実際に、TypeORMのmigrationという機能で、entityを元にテーブルを自動生成しています。(SQLを書かなくてもテーブルを作成できた！)今回はentityに記載されたコードを元に自動でテーブルが生成・更新される設定にしています。TablePlusからデータの追加や更新もできますが、今回は使わずに確認用にしてください。</p>

8.  repository の作成

    1. repository って？</br>
       データベースとの接続情報を記述しています。テーブルごとに作成することになります。SQL を使う場合は、ここに記述します。

    2. ディレクトリの作成</br>
       backend/src/ に「repository」という名前でディレクトリを作成してください。

    3. ファイルの作成</br>
       backend/src/repository/ に「user.repository.ts」「tweet.repository.ts」の両方を作成してください。

    4. backend/src/repository/user.repository.ts に下記のコードをコピー

       ```typescript
       import { Injectable } from '@nestjs/common';
       import { DataSource, Repository } from 'typeorm';
       import { User } from '../entity/user.entity';

       @Injectable()
       export class UserRepository extends Repository<User> {
         constructor(public dataSource: DataSource) {
           super(User, dataSource.createEntityManager());
         }
       }
       ```

    5. backend/src/repository/tweet.repository.ts に下記のコードをコピー

       ```typescript
       import { Injectable } from '@nestjs/common';
       import { DataSource, Repository } from 'typeorm';
       import { Tweet } from '../entity/tweet.entity';

       @Injectable()
       export class TweetRepository extends Repository<Tweet> {
         constructor(public dataSource: DataSource) {
           super(Tweet, dataSource.createEntityManager());
         }
       }
       ```

    6. 解説</br>
       <p>そんなにrepositoryをいじることはないです。難しそうな書き方をしてますが、普通に使う分には理解する必要はないので大丈夫です。ただ、ここに必要であればSQLを記述するということを知っておいてください</p>

9.  NestJS の下準備
    <p>今まではTypeORMに関する記述を行ってきました。ここから先はNestJSに関する記述を行っていきます。事前学習で学んでもらった通り、NestJSには「Service」「Controller」「Module」の3つの重要な要素があります。このパートではこの3つのベースとなるファイルをnest/cliを使って作成していきます。</p>

    1. twitter_api コンテナの中に入ってください(浦くんへ：docker desktop から入る方法の記述をお願いします)

    2. Module の作成
       <p>コンテナ内で下記のコマンドを実施する(nest: not foundとエラーが出るときは、手順5をもう一回やってみてください)(少し時間がかかります)</p>

       ```
       nest g mo user --no-spec
       nest g mo tweet --no-spec
       ```

    3. Controller の作成
       <p>コンテナ内で下記のコマンドを実施する(少し時間がかかります)</p>

       ```
       nest g co user --no-spec
       nest g co tweet --no-spec
       ```

    4. Service の作成
       <p>コンテナ内で下記のコマンドを実施する(少し時間がかかります)</p>

       ```
       nest g s user --no-spec
       nest g s tweet --no-spec
       ```

    5. 確認
       <p>backend/srcディレクトリ内にuserディレクトリとtweetディレクトリが自動作成されていることを確認してください。それぞれのディレクトリにcontroller, module, serviceの3つのファイルが生成されていたら成功です。もしもうまくいっていなければ、自動作成されたディレクトリを削除して、やり直してください。</p>

    6. 解説
       <p>nest/cliのコマンドを用いてディレクトリとファイルを作成しました。もちろん手動でやってもいいのですが、コマンドを使うことでファイル同士の依存関係も自動で記述してくれます。例えば、userディレクトリ内のuser.module.tsを見てみると、UserServiceとUserControllerを勝手にインポートしてくれています。また、各Moduleをルートモジュール(app.module.ts)に自動登録してくれています</p>

10. controller の作成
    <p>このパートではcontrollerの基礎となる部分を作成していきます。controllerの主な役割はルーティングでした。他にも、各種パラメーターの記述や、リクエストとレスポンスの型定義などを行うことができます。ここでは最低限のルーティングのみを記述していきます。</p>

    1. UserController の作成
       <p>backend/src/user/user.controller.ts に下記のコードを丸ごとコピーしてください。</p>

       ```typescript
       import { Controller, HttpCode, Post } from '@nestjs/common';
       import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
       import { UserService } from './user.service';

       //@Controller()と@Post()の引数でルーティングを記述
       @ApiTags('users')
       @Controller('users')
       export class UserController {
         //UserService を使うための記述
         constructor(private readonly userService: UserService) {}

         @ApiOperation({ summary: '新規登録' })
         @ApiResponse({ status: 200 })
         @HttpCode(200)
         @Post('create')
         async createUser(): Promise<any> {
           return {};
         }

         @ApiOperation({ summary: 'ログイン' })
         @ApiResponse({ status: 200 })
         @HttpCode(200)
         @Post('login')
         async login(): Promise<any> {
           return {};
         }
       }
       ```

    2. TweetController の作成
       <p>backend/src/tweet/tweet.controller.ts に下記のコードを丸ごとコピーしてください。</p>

       ```typescript
       import { Controller, Get, HttpCode, Post } from '@nestjs/common';
       import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
       import { TweetService } from './tweet.service';

       //@Controller()と@Post()の引数でルーティングを記述
       @ApiTags('tweets')
       @Controller('tweets')
       export class TweetController {
         //TweetServiceを使うための記述
         constructor(private readonly tweetService: TweetService) {}

         @ApiOperation({ summary: 'ツイート取得' })
         @ApiResponse({ status: 200 })
         @HttpCode(200)
         @Get()
         async getTweet(): Promise<any[]> {
           return [];
         }

         @ApiOperation({ summary: 'ツイート投稿' })
         @ApiResponse({ status: 200 })
         @HttpCode(200)
         @Post()
         async postTweet(): Promise<any> {
           return;
         }

         @ApiOperation({ summary: 'ツイート検索' })
         @ApiResponse({ status: 200 })
         @HttpCode(200)
         @Post('search')
         async searchTweet(): Promise<any[]> {
           return;
         }
       }
       ```

    3. 解説
       <p>このコードでちゃんと書かれているのはルーティングのみになります。@Controller()と@Post()の引数で指定しています。例えば、ユーザー新規登録のエンドポイントは/users/createになっています。エンドポイントに関しては最後に再確認するので、今は理解できていなくても大丈夫です。</p>

11. DTO の作成
    <p>DTO とは端的に説明すると、変数の型を集めたものです。今回は API のリクエストとレスポンスの型定義を行っていきます。同時に、class-validator を用いてバリデーションを行ってきます。</p>

    1. ディレクトリ、ファイルの作成
       　<p>tweet ディレクトリ内と user ディレクトリ内の両方に dto ディレクトリを作成し、その中に 2 つのファイル「request.ts」「response.ts」を作成してください。 backend/src のディレクトリ構成は下記のようになるはずです</p>

       ```
        src
        ├── app.controller.ts
        ├── app.module.ts
        ├── app.service.ts
        ├── entity
        │   ├── tweet.entity.ts
        │   └── user.entity.ts
        ├── main.ts
        ├── ormconfig.ts
        ├── repository
        │   ├── tweet.repository.ts
        │   └── user.repository.ts
        ├── tweet
        │   ├── dto
        │   │   ├── request.ts
        │   │   └── response.ts
        │   ├── tweet.controller.ts
        │   ├── tweet.module.ts
        │   └── tweet.service.ts
        └── user
            ├── dto
            │   ├── request.ts
            │   └── response.ts
            ├── user.controller.ts
            ├── user.module.ts
            └── user.service.ts
       ```

    2. User 用 dto 作成(リクエスト)
       　<p>backend/src/user/dto/request.ts に下記のコードをコピー</p>

       ```typescript
       import { ApiProperty } from '@nestjs/swagger';
       import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

       export class CreateUserDTO {
         @ApiProperty()
         @IsString({ message: 'nameは文字です' })
         @IsNotEmpty({ message: 'nameは必須です' })
         name: string;

         @ApiProperty()
         @IsEmail({}, { message: 'emailはメールアドレスです' })
         @IsNotEmpty({ message: 'emailは必須です' })
         email: string;

         @ApiProperty()
         @IsString({ message: 'passwordは文字です' })
         @IsNotEmpty({ message: 'passwordは必須です' })
         password: string;
       }

       export class LoginDTO {
         @ApiProperty()
         @IsEmail({}, { message: 'emailはメールアドレスです' })
         @IsNotEmpty({ message: 'emailは必須です' })
         email: string;

         @ApiProperty()
         @IsString({ message: 'passwordは文字です' })
         @IsNotEmpty({ message: 'passwordは必須です' })
         password: string;
       }
       ```

    3. User 用 dto 作成(レスポンス)
       　<p>backend/src/user/dto/response.ts に下記のコードをコピー</p>

       ```typescript
       import { ApiProperty } from '@nestjs/swagger';

       export class CreateUserResponse {
         @ApiProperty({ nullable: true })
         id: number | null;

         @ApiProperty({ nullable: true })
         name: string | null;
       }

       export class LoginResponse extends CreateUserResponse {}
       ```

    4. Tweet 用 dto 作成(リクエスト)
       　<p>backend/src/tweet/dto/request.ts に下記のコードをコピー</p>

       ```typescript
       import { ApiProperty } from '@nestjs/swagger';
       import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';

       export class PostTweetDTO {
         @ApiProperty()
         @IsNumber({}, { message: 'idは文字です' })
         @IsNotEmpty({ message: 'idは必須です' })
         id: string;

         @ApiProperty()
         @IsString({ message: 'contentは文字です' })
         @IsNotEmpty({ message: 'contentは必須です' })
         @Length(1, 140, { message: 'ツイートは140字以内です' })
         content: string;
       }

       export class SearchTweetDTO {
         @ApiProperty()
         @IsString({ message: 'textは文字です' })
         @IsNotEmpty({ message: 'textは必須です' })
         text: string;
       }
       ```

    5. Tweet 用 dto 作成(レスポンス)
       　<p>backend/src/tweet/dto/response.ts に下記のコードをコピー</p>

       ```typescript
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
       ```

    6. dto の適用(User コントローラー)
       <p>backend/src/user/user.controller.tsに下記の内容を丸ごとコピーしてください</p>

       ```typescript
       import { Body, Controller, HttpCode, Post } from '@nestjs/common';
       import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
       import { UserService } from './user.service';
       import { CreateUserResponse, LoginResponse } from './dto/response';
       import { CreateUserDTO, LoginDTO } from './dto/request';

       //@Controller()と@Post()の引数でルーティングを記述
       @ApiTags('users')
       @Controller('users')
       export class UserController {
         //UserServiceを使うための記述
         constructor(private readonly userService: UserService) {}

         @ApiOperation({ summary: '新規登録' })
         @ApiResponse({ status: 200, type: CreateUserResponse })
         @HttpCode(200)
         @Post('create')
         async createUser(
           @Body() { name, email, password }: CreateUserDTO,
         ): Promise<CreateUserResponse> {
           return;
         }

         @ApiOperation({ summary: 'ログイン' })
         @ApiResponse({ status: 200, type: LoginResponse })
         @HttpCode(200)
         @Post('login')
         async login(
           @Body() { email, password }: LoginDTO,
         ): Promise<LoginResponse> {
           return;
         }
       }
       ```

    7. dto の適用(Tweet コントローラー)
       <p>backend/src/tweet/tweet.controller.tsに下記の内容を丸ごとコピーしてください</p>

       ```typescript
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
           return;
         }

         @ApiOperation({ summary: 'ツイート投稿' })
         @ApiResponse({ status: 200, type: PostTweetResponse })
         @HttpCode(200)
         @Post()
         async postTweet(
           @Body() { id, content }: PostTweetDTO,
         ): Promise<PostTweetResponse> {
           return;
         }

         @ApiOperation({ summary: 'ツイート検索' })
         @ApiResponse({ status: 200, type: SearchTweetResponse })
         @HttpCode(200)
         @Post('search')
         async searchTweet(
           @Body() { text }: SearchTweetDTO,
         ): Promise<SearchTweetResponse> {
           return;
         }
       }
       ```

    8. 解説
       <p>class-validatorの名前の通り、classを使ってバリデーションと型定義を記述しています。@Is○○○()でバリデーションを行っていて、例えば@IsString()ではそのプロパティの値が文字列かどうかを見てくれています。引数で文字列じゃなかったときに表示するメッセージも指定できます</p>

    9. 確認
       <p><a>http://localhost:3002/doc#/</a> にアクセスして、APIドキュメントを確認してみてください。今まで作成してきた5つのエンドポイントが確認できるはずです。各エンドポイントをクリックすると、APIを試せる画面に切り替わります。「Try it out」を押した後に「Request Body」を編集し、「Execute」を押すとAPIを叩くことができます。今はまだServiceの作成が完了していないので正常に動きませんが、バリデーションは機能しています。試しに「新規登録API」をRequest Bodyをいじらずに叩いてみてください。ステータスコードが400で、返ってきたResponse Bodyのmessageに「"emailはメールアドレスです"」と表示されているはずです。ちゃんとバリデーションができていますね。試しにemailをメールアドレスの形式(例: "string@gmail.com")等にすると、ステータスコードが200(成功)となります。その他のバリデーションもぜひ試してみてください。ちなみにこの画面はswaggerというツールを使って生成しています。今まで「@nestjs/swagger」からimportされていたメソッドは全てswaggerの為の記述でした。なのでもしもswaggerを使わない場合は、もう少しコードの記述量が減ります。</p>
