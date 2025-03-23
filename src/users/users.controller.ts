import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Usuario } from 'src/models/usuarios.models';
import { CreateUserDto } from 'src/models/DTO/create-user.dto';
import { UpdateUserDto } from 'src/models/DTO/update-user.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios encontrados',
    type: [Usuario],
  })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  findAll(): Promise<Usuario[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su id' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
    type: Usuario,
  })
  @ApiResponse({ status: 400, description: 'Datos invalidos' })
  create(@Body() usuario: CreateUserDto): Promise<Usuario> {
    return this.usersService.create(usuario);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(
    @Param('id') id: number,
    @Body() usuario: UpdateUserDto,
  ): Promise<Usuario | null> {
    return this.usersService.update(id, usuario);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado' })
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
