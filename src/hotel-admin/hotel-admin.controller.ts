import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HotelAdminService } from './hotel-admin.service';
import { CreateHotelAdminDto } from 'src/models/DTO/create-hotel-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Relaciones de admin')
@Controller('hotel-admin')
export class HotelAdminController {
    constructor(
        private hotelAdminService: HotelAdminService
    ){}

    @Post()
    @ApiOperation({ summary: 'Crear una relacion de admin' })
    @ApiResponse({status: 201, description: 'Asignacion creada'})
    create(@Body() dto: CreateHotelAdminDto){
        return this.hotelAdminService.create(dto);
    }

    @Get('usuario/:usuarioId/hoteles')
    @ApiOperation({ summary: 'Obtener todos los hoteles de un usuario' })
    @ApiResponse({status: 200, description: 'Lista de hoteles'})
    getHotelesByUsuario(@Param('usuarioId',ParseIntPipe)usuarioId: number){
        return this.hotelAdminService.getHotelesByUsuario(usuarioId);
    }

    @Get('hotel/:hotelId/usuarios')
    @ApiOperation({ summary: 'Obtener todos los usuarios de un hotel' })
    @ApiResponse({status: 200, description: 'Lista de usuarios'})
    getUsuariosByHotel(@Param('hotelId',ParseIntPipe)hotelId: number){
        return this.hotelAdminService.getUsuariosByHotel(hotelId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una relacion de admin' })
    @ApiResponse({status: 204, description: 'Relacion eliminada'})
    delete(@Param('id') id: number){
        return this.hotelAdminService.delete(id);
    }
}
