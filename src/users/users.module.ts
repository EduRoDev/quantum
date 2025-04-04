import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/models/usuarios.models';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), ClientesModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
