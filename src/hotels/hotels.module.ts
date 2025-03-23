import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/models/hoteles.models';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  providers: [HotelsService],
  controllers: [HotelsController]
})
export class HotelsModule {}
