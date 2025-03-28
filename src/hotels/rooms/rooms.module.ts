import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from 'src/models/habitaciones.models';
import { Hotel } from 'src/models/hoteles.models';
import { Reserva } from 'src/models/reservas.models';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Habitacion,
      Hotel,
      Reserva
    ]),
  ],
  providers: [RoomsService],
  controllers: [RoomsController]
})
export class RoomsModule {}
