import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/models/hoteles.models';
import { RoomsModule } from './rooms/rooms.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), RoomsModule, BookingModule],
  providers: [HotelsService],
  controllers: [HotelsController]
})
export class HotelsModule {}
