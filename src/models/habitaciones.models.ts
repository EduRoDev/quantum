import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './hoteles.models';
import { Reserva } from './reservas.models';

@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre: string;
  
  @Column()
  precio: number;
  
  @Column({
    type: 'enum',
    enum: ['libre', 'ocupado', 'reservada'],
    default: 'libre',
  })
  estado: string;
  
  @Column()
  capacidad: number;
  
  @Column()
  imagen_url?: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.habitaciones)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => Reserva, (reserva) => reserva.habitacion)
  reservas: Reserva[];
}
