import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/models/clientes.models';
import { CheckAvailabilityDto } from 'src/hotels/booking/DTO/check-availability.dto';
import { CreateReservaDto } from 'src/hotels/booking/DTO/create-reserva.dto';
import { Habitacion } from 'src/models/habitaciones.models';
import { Reserva } from 'src/models/reservas.models';
import { Between, Not, Repository } from 'typeorm';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    @InjectRepository(Reserva)
    private bookingRepository: Repository<Reserva>,
    @InjectRepository(Habitacion)
    private roomRepository: Repository<Habitacion>,
    @InjectRepository(Clientes)
    private clientRepository: Repository<Clientes>,
  ) {}

  async create(dto: CreateReservaDto): Promise<Reserva> {
    try {
      const [cliente, habitacion] = await Promise.all([
        this.clientRepository.findOne({ where: { id: dto.cliente_id } }),
        this.roomRepository.findOne({
          where: { id: dto.habitacion_id },
          relations: ['hotel'],
        }),
      ]);

      if (!cliente) throw new NotFoundException('Cliente no encontrado');
      if (!habitacion) throw new NotFoundException('Habitación no encontrada');

      if (new Date(dto.checkOut) <= new Date(dto.checkIn)) {
        throw new ConflictException(
          'La fecha de salida debe ser posterior a la de entrada',
        );
      }

      const existeReserva = await this.bookingRepository.findOne({
        where: {
          habitacion: { id: dto.habitacion_id },
          checkIn: Between(dto.checkIn, dto.checkOut),
          checkOut: Between(dto.checkIn, dto.checkOut),
          estado: Not('cancelada'),
        },
      });

      if (existeReserva) {
        throw new ConflictException(
          'La habitación no está disponible para esas fechas',
        );
      }

      const reserva = this.bookingRepository.create({
        ...dto,
        cliente,
        habitacion,
      });

      return await this.bookingRepository.save(reserva);
    } catch (error) {
      this.logger.error(`Error al crear reserva: ${error.message}`);
      throw error;
    }
  }

  async CheckAvailability(dto: CheckAvailabilityDto): Promise<Habitacion[]> {
    try {
      if (new Date(dto.checkOut) <= new Date(dto.checkIn)) {
        throw new ConflictException('Rango de fechas inválido');
      }

      const query = this.roomRepository
        .createQueryBuilder('habitacion')
        .leftJoinAndSelect('habitacion.reservas', 'reserva')
        .where('reserva.id IS NULL OR reserva.estado = :cancelada', {
          cancelada: 'cancelada',
        })
        .orWhere(
          `(reserva.checkIn NOT BETWEEN :checkIn AND :checkOut)
          AND (reserva.checkOut NOT BETWEEN :checkIn AND :checkOut)`,
          { checkIn: dto.checkIn, checkOut: dto.checkOut },
        );

      if (dto.hotel_id) {
        query.andWhere('habitacion.hotel_id = :hotel_id', {
          hotel_id: dto.hotel_id,
        });
      }

      return await query.getMany();
    } catch (error) {
      this.logger.error(`Error al verificar disponibilidad: ${error.message}`);
      throw error;
    }
  }

  async findByClient(client_id: number): Promise<Reserva[]> {
    try {
      return await this.bookingRepository.find({
        where: { cliente: { id: client_id } },
        relations: ['habitacion', 'cliente'],
        order: { checkIn: 'DESC' },
      });
    } catch (error) {
      this.logger.error(
        `Error al buscar reservas por cliente: ${error.message}`,
      );
      throw error;
    }
  }

  async cancelReserva(id: number): Promise<Reserva> {
    try {
      const reserva = await this.bookingRepository.findOne({
        where: { id },
        relations: ['habitacion', 'cliente'],
      });

      if (!reserva) throw new NotFoundException('Reserva no encontrada');
      if (reserva.estado === 'cancelada') {
        throw new ConflictException('La reserva ya está cancelada');
      }

      reserva.estado = 'cancelada';
      return await this.bookingRepository.save(reserva);
    } catch (error) {
      this.logger.error(`Error al cancelar reserva: ${error.message}`);
      throw error;
    }
  }

  async getCliente(id: number): Promise<Clientes> {
    try {
      const reserva = await this.bookingRepository.findOne({
        where: { id },
        relations: ['cliente'],
      });
      if (!reserva) throw new NotFoundException('Reserva no encontrada');
      return reserva.cliente;
    } catch (error) {
      this.logger.error(`Error al obtener cliente: ${error.message}`);
      throw error;
    }
  }
}
