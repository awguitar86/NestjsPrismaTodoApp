import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { TodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('todos')
@Controller('user/:userId/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public async create(
    @Param('userId') userId: string,
    @Body() createTodoDto: TodoDto,
  ) {
    return this.todosService.create({ userId: +userId, ...createTodoDto });
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async findAll(@Param('userId') userId: string) {
    return await this.todosService.findAll(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  public async update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateTodoDto: TodoDto,
  ) {
    return await this.todosService.update(+id, {
      userId: +userId,
      ...updateTodoDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
