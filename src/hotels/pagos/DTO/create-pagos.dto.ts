import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePagosDto {
  @IsNotEmpty()
  Fecha_pago: Date;

  @IsNotEmpty()
  Estado: string;

  @IsNotEmpty()
  @IsDecimal()
  Monto: number;

  @IsNotEmpty()
  Tipo_pago: string;

  @IsNotEmpty()
  @IsInt()
  cliente_id: number;

  @IsNotEmpty()
  @IsInt()
  reserva_id: number;
}
