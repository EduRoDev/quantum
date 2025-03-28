import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Habitacion } from 'src/models/habitaciones.models';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from 'src/models/DTO/create-room.dto';
import { UpdateRoomDto } from 'src/models/DTO/update-room.dto';

@ApiTags('Habitaciones')
@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una habitación' })
  create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las habitaciones' })
  @ApiResponse({ status: 200, type: Habitacion })
  findAll(): Promise<Habitacion[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una habitación por ID' })
  @ApiResponse({ status: 200, type: Habitacion })
  findOne(@Param('id') id: number): Promise<Habitacion> {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una habitación' })
  @ApiResponse({ status: 200, type: Habitacion })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoomDto) {
    return this.roomService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una habitación' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roomService.remove(id);
  }
}
