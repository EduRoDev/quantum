import { Module } from '@nestjs/common';
import { HotelAdminController } from './hotel-admin.controller';
import { HotelAdminService } from './hotel-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/models/usuarios.models';
import { Hotel } from 'src/models/hoteles.models';
import { HotelAdmin } from 'src/models/hotel_admins.models';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelAdmin,Usuario,Hotel])
  ],
  controllers: [HotelAdminController],
  providers: [HotelAdminService]
})
export class HotelAdminModule {}
