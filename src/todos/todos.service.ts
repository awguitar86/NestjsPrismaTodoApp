import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(todoDto: TodoDto) {
    return this.prisma.toDo.create({ data: todoDto });
  }

  findAll(userId: number) {
    return this.prisma.toDo.findMany({ where: { userId } });
  }

  findOne(id: number) {
    return this.prisma.toDo.findUnique({ where: { id } });
  }

  update(id: number, todoDto: TodoDto) {
    return this.prisma.toDo.update({
      where: { id },
      data: todoDto,
    });
  }

  remove(id: number) {
    return this.prisma.toDo.delete({ where: { id } });
  }
}
