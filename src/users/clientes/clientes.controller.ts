import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from 'src/models/DTO/create-client.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateClientDto } from 'src/models/DTO/update-client.dto';

@Controller('clientes')
export class ClientesController {
    constructor(
        private clientesService: ClientesService
    ){}

    @Post()
  @ApiOperation({ summary: 'Crear nuevo cliente' })
  @ApiResponse({ 
    status: 201, 
    description: 'Cliente creado exitosamente'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El email o DNI ya están registrados' 
  })
  create(@Body() dto: CreateClienteDto) {
    return this.clientesService.createCliente(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de clientes'
  })
  findAll() {
    return this.clientesService.getClientes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente encontrado'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cliente no encontrado' 
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.getCliente(id);
  }

  @Get(':id/reservas')
  @ApiOperation({ summary: 'Obtener reservas de un cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de reservas del cliente' 
  })
  getReservas(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.getRervasByCliente(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cliente actualizado',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientDto,
  ) {
    return this.clientesService.updateCliente(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar cliente' })
  @ApiResponse({ 
    status: 204, 
    description: 'Cliente eliminado' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cliente no encontrado' 
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.removeCliente(id);
  }
}

