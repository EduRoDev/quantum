import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from 'src/models/hoteles.models';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateHotelDto } from 'src/hotels/DTO/update-hotel.dto';
import { CreateHotelDto } from 'src/hotels/DTO/create-hotel.dto';

@ApiTags('Hoteles')
@Controller('hotels')
export class HotelsController {
  constructor(private hotelService: HotelsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los hoteles' })
  @ApiResponse({ status: 200, description: 'Lista de hoteles', type: [Hotel] })
  @ApiResponse({ status: 404, description: 'No se encontraron hoteles' })
  findAll(): Promise<Hotel[]> {
    return this.hotelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hotel por su id' })
  @ApiResponse({ status: 200, description: 'Hotel encontrado', type: Hotel })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  findOne(@Param('id') id: number): Promise<Hotel> {
    return this.hotelService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un hotel' })
  @ApiResponse({ status: 201, description: 'Hotel creado', type: Hotel })
  @ApiResponse({ status: 400, description: 'Datos invalidos' })
  create(@Body() hotel: CreateHotelDto): Promise<Hotel> {
    return this.hotelService.create(hotel);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un hotel' })
  @ApiResponse({ status: 200, description: 'Hotel actualizado', type: Hotel })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  update(
    @Param('id') id: number,
    @Body() hotel: UpdateHotelDto,
  ): Promise<Hotel | null> {
    return this.hotelService.update(id, hotel);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un hotel' })
  @ApiResponse({ status: 204, description: 'Hotel eliminado' })
  delete(@Param('id') id: number): Promise<void> {
    return this.hotelService.delete(id);
  }
}
