import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from '../../models/habitaciones.models';
import { Reserva } from '../../models/reservas.models';
import { Clientes } from 'src/models/clientes.models';

@Module({
imports: [
    TypeOrmModule.forFeature([Reserva, Habitacion, Clientes])
],
providers: [BookingService],
controllers: [BookingController]
})
export class BookingModule {}
