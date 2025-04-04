import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientes } from 'src/models/clientes.models';
import { Reserva } from 'src/models/reservas.models';
import { Pago } from 'src/models/pagos.models';

@Module({
  imports: [TypeOrmModule.forFeature([Pago,Reserva,Clientes])],
  controllers: [PagosController],
  providers: [PagosService]
})
export class PagosModule {}
