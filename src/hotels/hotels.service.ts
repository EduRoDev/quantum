import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/models/hoteles.models';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async findAll(): Promise<Hotel[]> {
    return await this.hotelRepository.find();
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({ where: {id } });
    if (!hotel) throw new NotFoundException('Hotel no encontrado');
    return hotel;
  }

  async create(hotel: Hotel): Promise<Hotel> {
    const NewHotel = await this.hotelRepository.save(hotel);
    return NewHotel;
  }

  async update(id: number, dataHotel: Partial<Hotel>): Promise<Hotel | null> {
    const hotelExistente = await this.hotelRepository.findOne({
      where: { id },
    });
    if (!hotelExistente) return null;

    const hotelActualizado = this.hotelRepository.merge(
      hotelExistente,
      dataHotel,
    );
    return await this.hotelRepository.save(hotelActualizado);
  }

  async delete(id: number): Promise<void> {
    const result = await this.hotelRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Hotel no encontrado');
    }
  }
}
