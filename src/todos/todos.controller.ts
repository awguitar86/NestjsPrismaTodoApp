import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto } from './dto/todo.dto';

@Controller('users/:userId/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Param('userId') userId: string, @Body() createTodoDto: TodoDto) {
    return this.todosService.create({ userId, ...createTodoDto });
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.todosService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateTodoDto: TodoDto,
  ) {
    return this.todosService.update(+id, { userId, ...updateTodoDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
