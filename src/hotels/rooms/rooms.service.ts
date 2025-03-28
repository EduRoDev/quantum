import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from 'src/models/DTO/create-room.dto';
import { UpdateRoomDto } from 'src/models/DTO/update-room.dto';
import { Habitacion } from 'src/models/habitaciones.models';
import { Hotel } from 'src/models/hoteles.models';

import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Habitacion)
    private roomRepository: Repository<Habitacion>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async findAll(): Promise<Habitacion[]> {
    return await this.roomRepository.find({ relations: ['hotel', 'reservas'] });
  }

  async findOne(id: number): Promise<Habitacion> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['hotel', 'reservas'],
    });
    if (!room) throw new NotFoundException('Habitación no encontrada');
    return room;
  }

  async create(dto: CreateRoomDto): Promise<Habitacion> {
    const hotel = await this.hotelRepository.findOne({
      where: { id: dto.hotel_id },
    });
    if (!hotel) throw new NotFoundException('Hotel asociado no encontrado');

    const habitacion = this.roomRepository.create({
      ...dto,
      hotel,
    });

    return await this.roomRepository.save(habitacion);
  }

  async update(id: number, dto: Partial<UpdateRoomDto>): Promise<Habitacion> {
    const habitacion = await this.roomRepository.preload({
      id,
      ...dto,
    });

    if (!habitacion) {
      throw new NotFoundException('Habitación no encontrada');
    }

    if (dto.hotel_id) {
      const hotel = await this.hotelRepository.findOne({
        where: { id: dto.hotel_id },
      });
      if (!hotel) throw new NotFoundException('Hotel asociado no encontrado');
      habitacion.hotel = hotel;
    }

    return await this.roomRepository.save(habitacion);
  }

  async remove(id: number): Promise<void> {
    const habitacion = await this.roomRepository.findOne({ where: { id }
     });
    if (!habitacion) throw new NotFoundException('Habitación no encontrada');
    await this.roomRepository.remove(habitacion);
  }

  async getReservas(id: number) {
    const habitacion = await this.roomRepository.findOne({
      where: { id },
      relations: ['reservas'],
    });
    if (!habitacion) throw new NotFoundException('Habitación no encontrada');
    return habitacion.reservas;
  }
}
