import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Usuario } from 'src/models/usuarios.models';
import { CreateUserDto} from 'src/models/DTO/create-user.dto';
import { UpdateUserDto } from 'src/models/DTO/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  findAll(): Promise<Usuario[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() usuario: CreateUserDto): Promise<Usuario> {
    return this.usersService.create(usuario);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() usuario: UpdateUserDto,
  ): Promise<Usuario | null> {
    return this.usersService.update(id, usuario);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
