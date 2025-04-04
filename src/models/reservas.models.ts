import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clientes } from './clientes.models';
import { Habitacion } from './habitaciones.models';
import { Pago } from './pagos.models';

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

  @OneToMany(() => Pago, (pago) => pago.reserva)
  pagos: Pago[];
}
