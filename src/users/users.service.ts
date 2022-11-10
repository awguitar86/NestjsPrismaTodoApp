import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneById(id: number) {
    return this.prisma.user.findUnique({
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

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  update(id: number, userDto: CreateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: userDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
