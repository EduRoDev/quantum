import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clientes } from './clientes.models';
import { Habitacion } from './habitaciones.models';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Habitacion, (habitacion) => habitacion.reservas)
  @JoinColumn({ name: 'habitacion_id' })
  habitacion: Habitacion;
  @ManyToOne(() => Clientes, (cliente) => cliente.reservas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Clientes;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'cancelada', 'pagada'],
    default: 'pendiente',
  })
  estado: string;

  @Column({ type: 'date' })
  checkIn: Date;

  @Column({ type: 'date' })
  checkOut: Date;
}
