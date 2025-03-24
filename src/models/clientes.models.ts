import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TipoDocumento } from "./enum/tipo_documento.enum";

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
    @Column({enum: TipoDocumento})
    tipo_documento: TipoDocumento;
    @Column()
    dni: string;
    @Column()
    fecha_nacimiento: Date;
}