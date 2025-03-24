import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "./hoteles.models";

@Entity('habitaciones')
export class Habitacion {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    precio: number;
    @Column()
    estado: boolean;
    @Column()
    capacidad: number;
    @Column()
    imagen_url: Text;

    @ManyToOne(() => Hotel, (hotel) => hotel.habitaciones)
    @JoinColumn({name:'hotel_id'})
    hotel:Hotel;
}