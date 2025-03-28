import { IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckAvailabilityDto {
  @ApiProperty({ example: '2024-12-01', description: 'Fecha de check-in' })
  @IsDateString()
  checkIn: Date;

  @ApiProperty({ example: '2024-12-05', description: 'Fecha de check-out' })
  @IsDateString()
  checkOut: Date;

  @ApiProperty({ example: 1, description: 'ID del hotel (opcional)' })
  @IsInt()
  hotel_id?: number;
}