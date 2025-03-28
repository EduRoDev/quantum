import { PartialType } from "@nestjs/swagger";
import { CreateHotelDto } from "../../hotels/DTO/create-hotel.dto";

export class UpdateHotelDto extends PartialType(CreateHotelDto) {}