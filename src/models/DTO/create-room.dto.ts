import { IsInt, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    nombre: string;
    @IsInt()
    precio: number;
    @IsString()
    estado: string;
    @IsInt()
    capacidad: number;
    @IsString()
    imagen_url: string;
    @IsInt()
    hotel_id: number;
}