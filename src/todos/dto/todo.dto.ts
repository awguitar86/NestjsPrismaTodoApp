import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsBoolean()
  @IsNotEmpty()
  public completed: boolean;

  @IsNumber()
  @IsNotEmpty()
  public userId: number;
}
