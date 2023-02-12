import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';

export class PostTweetDTO {
  @ApiProperty()
  @IsNumber({}, { message: 'idは文字です' })
  @IsNotEmpty({ message: 'idは必須です' })
  id: number;

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
