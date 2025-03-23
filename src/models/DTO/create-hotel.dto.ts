import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  tipo_alojamiento: string;
  @IsNotEmpty()
  direccion: string;
  @IsNotEmpty()
  telefono: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
