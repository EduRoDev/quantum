import { PartialType } from "@nestjs/swagger";
import { CreateClienteDto } from "./create-client.dto";

export class UpdateClientDto extends PartialType(CreateClienteDto) {}