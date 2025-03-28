import { PartialType } from "@nestjs/swagger";
import { CreateReservaDto } from "src/hotels/booking/DTO/create-reserva.dto";

export class UpdateReservaDto  extends PartialType(CreateReservaDto){}