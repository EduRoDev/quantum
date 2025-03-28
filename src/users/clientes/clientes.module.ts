import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientes } from 'src/models/clientes.models';
import { Reserva } from 'src/models/reservas.models';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clientes,Reserva])
  ],
  providers: [ClientesService],
  controllers: [ClientesController]
})
export class ClientesModule {}
