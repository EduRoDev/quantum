import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoDocumento } from './enum/tipo_documento.enum';
import { Reserva } from './reservas.models';
import { Pago } from './pagos.models';

@Entity('clientes')
export class Clientes {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column({ unique: true })
  email: string;
  @Column()
  telefono: string;
  @Column({ type: 'enum', enum: TipoDocumento, default: TipoDocumento.CC })
  tipo_documento: string;
  @Column()
  dni: string;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_nacimiento: Date;

  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  reservas: Reserva[];

  @OneToMany(() => Pago, (pago) => pago.cliente)
  pagos: Pago[];
}
