import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hoteles.models';
import { Usuario } from './usuarios.models';

@Entity()
export class HotelAdmin {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.hotelesAdmin)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Hotel, (hotel) => hotel.admins)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
}
