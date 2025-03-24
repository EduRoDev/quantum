import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HotelAdmin } from './hotel_admins.models';
import { Habitacion } from './habitaciones.models';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  nombre: string;
  @Column()
  tipo_alojamiento: string;
  @Column()
  direccion: string;
  @Column()
  telefono: string;
  @Column()
  email: string;

  @OneToMany(() => HotelAdmin, (hotelAdmin) => hotelAdmin.hotel)
  admins?: HotelAdmin[];

  @OneToMany(() => Habitacion, (habitacion) => habitacion.hotel)
  habitaciones?: Habitacion[];
}
