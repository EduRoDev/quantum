import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reserva } from './reservas.models';
import { Clientes } from './clientes.models';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  Fecha_pago: Date;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'completado', 'rechazado', 'reembolsado'],
    default: 'pendiente',
  })
  Estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Monto: number;

  @Column({ type: 'varchar' })
  Tipo_pago: string;

  @ManyToOne(() => Reserva, (reserva) => reserva.pagos)
  @JoinColumn({name: 'reserva_id'})
  reserva: Reserva;

  @ManyToOne(() => Clientes, (cliente) => cliente.pagos)
  @JoinColumn({name: 'cliente_id'})
  cliente: Clientes;


}
