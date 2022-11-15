import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, TodosModule, AuthModule],
})
export class AppModule {}
