import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoDocumento } from './enum/tipo_documento.enum';
import { HotelAdmin } from './hotel_admins.models';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ enum: TipoDocumento })
  tipo_documento: TipoDocumento;

  @Column({ unique: true })
  dni: string;

  @Column()
  telefono: string;

  @Column()
  fecha_nacimiento: Date;

  @Column()
  pais: string;

  @Column()
  ciudad: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token?: string;

  @OneToMany(() => HotelAdmin, (hotelAdmin) => hotelAdmin.usuario)
  hotelesAdmin?: HotelAdmin[];
}
