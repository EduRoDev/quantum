import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHotelAdminDto } from 'src/models/DTO/create-hotel-admin.dto';
import { HotelAdmin } from 'src/models/hotel_admins.models';
import { Hotel } from 'src/models/hoteles.models';
import { Usuario } from 'src/models/usuarios.models';
import { Repository } from 'typeorm';

@Injectable()
export class HotelAdminService {
  constructor(
    @InjectRepository(HotelAdmin)
    private hotelAdminRepo: Repository<HotelAdmin>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Hotel)
    private hotelRepo: Repository<Hotel>,
  ) {}

  async create(dto: CreateHotelAdminDto): Promise<HotelAdmin> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: dto.usuario_id },
    });
    if (!usuario) throw new Error('Usuario no encontrado');

    const hotel = await this.hotelRepo.findOne({ where: { id: dto.hotel_id } });
    if (!hotel) throw new Error('Hotel no encontrado');

    const nuevaAsignacion = this.hotelAdminRepo.create({
      usuario,
      hotel,
    });

    return await this.hotelAdminRepo.save(nuevaAsignacion);
  }

  async getHotelesByUsuario(usuarioId: number): Promise<Hotel[]>{
    const relaciones = await this.hotelAdminRepo.find({
        where: { usuario: { id: usuarioId } },
        relations: ['hotel']
    })
    return relaciones.map(relacion => relacion.hotel);
  }

  async getUsuariosByHotel(hotelId: number): Promise<Usuario[]>{
    const relaciones = await this.hotelAdminRepo.find({
        where: { hotel: { id: hotelId } },
        relations: ['usuario']
    })
    return relaciones.map(relacion => relacion.usuario);
  }

  async delete(id: number): Promise<void> {
    const result = await this.hotelAdminRepo.delete(id);
    if (result.affected === 0) {
      throw new Error('Relacion no encontrada');
    }
  }
}
