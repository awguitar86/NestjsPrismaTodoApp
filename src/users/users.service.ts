import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto, LoginUserDto, UpdatePasswordDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/auth/jwt.strategy';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  async create(userDto: UserDto): Promise<any> {
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException('user_already_exists', HttpStatus.CONFLICT);
    }
    return await this.prisma.user.create({
      data: {
        ...userDto,
        password: await hash(userDto.password, 10),
      },
    });
  }

  async findOneByEmail({
    email,
    password,
  }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        toDos: {
          where: {
            userId: user.id,
          },
        },
      },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        toDos: {
          where: {
            userId: id,
          },
        },
      },
    });
  }

  async findByPayload({ email }: JwtPayload) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
}
