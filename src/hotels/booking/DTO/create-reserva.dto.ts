import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ example: 1, description: 'ID de la habitación' })
  @IsInt()
  habitacion_id: number;

  @ApiProperty({ example: 1, description: 'ID del cliente' })
  @IsInt()
  cliente_id: number;

  @ApiProperty({ example: '2024-12-01', description: 'Fecha de entrada' })
  @IsDateString()
  checkIn: Date;

  @ApiProperty({ example: '2024-12-05', description: 'Fecha de salida' })
  @IsDateString()
  checkOut: Date;

  @ApiProperty({ 
    example: 'pendiente', 
    enum: ['pendiente', 'cancelada', 'pagada'],
    default: 'pendiente'
  })
  @IsEnum(['pendiente', 'cancelada', 'pagada'])
  estado?: string;
}