import { ToDo } from '@prisma/client';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty()
  @IsArray()
  public toDos: ToDo[];
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly new_password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly old_password: string;
}
