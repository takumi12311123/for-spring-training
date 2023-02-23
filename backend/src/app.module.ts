import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.23.0.3',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'twitter',
      entities: ['dist/entity/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UserModule,
    TweetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
