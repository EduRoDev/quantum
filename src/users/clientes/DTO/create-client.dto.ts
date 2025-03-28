import { IsDateString, IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { TipoDocumento } from 'src//models/enum/tipo_documento.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del cliente' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del cliente' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ example: 'juan@example.com', description: 'Email único del cliente' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+549114567890', description: 'Teléfono de contacto' })
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ApiProperty({ 
    enum: TipoDocumento, 
    example: TipoDocumento.CC,
    description: 'Tipo de documento' 
  })
  @IsEnum(TipoDocumento)
  tipo_documento: TipoDocumento;

  @ApiProperty({ example: '12345678', description: 'Número de documento' })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiProperty({ example: '1990-01-01', description: 'Fecha de nacimiento' })
  @IsDateString()
  @IsNotEmpty()
  fecha_nacimiento: Date;
}