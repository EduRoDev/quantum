import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagosDto } from './DTO/create-pagos.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pagos')
@Controller('pagos')
export class PagosController {
    constructor(
        private readonly pagosService: PagosService,
    ){}

    @Post()
    @ApiOperation({ summary: 'Crear un pago' })
    @ApiResponse({ status: 201, description: 'Pago creado correctamente' })
    async createPago(@Body() dto: CreatePagosDto){
        return this.pagosService.createPago(dto)
    }


    @Get('cliente/:clienteId')
    @ApiOperation({ summary: 'Obtener pagos de un cliente' })
    @ApiResponse({ status: 200, description: 'Pagos obtenidos correctamente' })
    async obtenerPagos(@Param('clienteId') clienteId: number){
        return this.pagosService.obtenerPagos(clienteId)
    }

    @Post('reembolsar/:pagoId')
    @ApiOperation({ summary: 'Reembolsar un pago' })
    @ApiResponse({ status: 200, description: 'Pago reembolsado correctamente' })
    async reembolsarPago(@Param('pagoId') pagoId: number){
        return this.pagosService.reembolsarPago(pagoId)
    }

    @Post('cancelar/:pagoId')
    @ApiOperation({ summary: 'Cancelar un pago' })
    @ApiResponse({ status: 200, description: 'Pago cancelado correctamente' })
    async cancelarPago(@Param('pagoId') pagoId: number){
        return this.pagosService.cancelarPago(pagoId)
    }


}
