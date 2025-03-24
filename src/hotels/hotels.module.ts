import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/models/hoteles.models';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), RoomsModule],
  providers: [HotelsService],
  controllers: [HotelsController]
})
export class HotelsModule {}
