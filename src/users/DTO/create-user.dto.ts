import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TipoDocumento } from 'src/models/enum/tipo_documento.enum';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @IsNotEmpty()
  @IsString()
  apellido: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  tipo_documento: TipoDocumento;
  @IsNotEmpty()
  @IsString()
  dni: string;
  @IsNotEmpty()
  @IsString()
  telefono: string;
  @IsNotEmpty()
  fecha_nacimiento: Date;
  @IsNotEmpty()
  pais: string;
  @IsNotEmpty()
  ciudad: string;
  @IsNotEmpty()
  password: string;
}
