import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { BookingService } from './booking.service';
  import { CreateReservaDto } from 'src/hotels/booking/DTO/create-reserva.dto';
  import { CheckAvailabilityDto } from 'src/hotels/booking/DTO/check-availability.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { Reserva } from 'src/models/reservas.models';
import { Clientes } from 'src/models/clientes.models';
  
  @ApiTags('Booking')
  @Controller('booking')
  export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear nueva reserva' })
    @ApiResponse({ 
      status: 201, 
      description: 'Reserva creada exitosamente',
      type: Reserva 
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Cliente o habitación no encontrada' 
    })
    @ApiResponse({ 
      status: 409, 
      description: 'Habitación no disponible en las fechas solicitadas' 
    })
    async create(@Body() dto: CreateReservaDto) {
      return this.bookingService.create(dto);
    }
  
    @Post('availability')
    @ApiOperation({ summary: 'Verificar disponibilidad de habitaciones' })
    @ApiResponse({ 
      status: 200, 
      description: 'Lista de habitaciones disponibles',
      isArray: true 
    })
    async checkAvailability(@Body() dto: CheckAvailabilityDto) {
      return this.bookingService.CheckAvailability(dto);
    }
  
    @Get('client/:client_id')
    @ApiOperation({ summary: 'Obtener reservas por cliente' })
    @ApiParam({ name: 'client_id', type: Number })
    @ApiResponse({ 
      status: 200, 
      description: 'Lista de reservas del cliente',
      type: [Reserva] 
    })
    async findByClient(@Param('client_id', ParseIntPipe) client_id: number) {
      return this.bookingService.findByClient(client_id);
    }
  
    @Delete(':id/cancel')
    @ApiOperation({ summary: 'Cancelar reserva' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ 
      status: 200, 
      description: 'Reserva cancelada exitosamente',
      type: Reserva 
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Reserva no encontrada' 
    })
    async cancelReserva(@Param('id', ParseIntPipe) id: number) {
      return this.bookingService.cancelReserva(id);
    }
  
    @Get(':id/client')
    @ApiOperation({ summary: 'Obtener cliente asociado a una reserva' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ 
      status: 200, 
      description: 'Datos del cliente',
      type: Clientes 
    })
    async getCliente(@Param('id', ParseIntPipe) id: number) {
      return this.bookingService.getCliente(id);
    }
  }