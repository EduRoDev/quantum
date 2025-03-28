import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/models/clientes.models';
import { CreateClienteDto } from 'src/models/DTO/create-client.dto';
import { UpdateClientDto } from 'src/models/DTO/update-client.dto';
import { Reserva } from 'src/models/reservas.models';

import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Clientes)
        private clienteRespository: Repository<Clientes>
    ) {}

    async getClientes(): Promise<Clientes[]> {
        return await this.clienteRespository.find();
    }

    async getCliente(id: number): Promise<Clientes> {
        const cliente = await this.clienteRespository.findOne({ 
            where: { id },
            relations: ['reservas']
        });
        if (!cliente) throw new NotFoundException('Cliente no encontrado');
        
        return cliente;
    }

    async createCliente(cliente: CreateClienteDto): Promise<Clientes> {
        const exist = await this.clienteRespository.findOne({
            where: [
                {email: cliente.email},
                {dni: cliente.dni}
            ]
        })

        if (exist) throw new ConflictException('El email o dni ya esta en uso');

        const client = this.clienteRespository.create(cliente);
        return await this.clienteRespository.save(client);
    }

    async updateCliente(id: number, cliente: UpdateClientDto): Promise<Clientes> {
        const client = await this.clienteRespository.preload({
            id,
            ...cliente
        })

        if (!client) throw new NotFoundException('Cliente no encontrado');
        if (cliente.email || cliente.dni) {
            const exists = await this.clienteRespository.findOne({
                where: [
                  { email: cliente.email ?? client.email },
                  { dni: cliente.dni ?? client.dni }
                ]
            })

            if (exists && exists.id !== id) {
                throw new ConflictException('El email o dni ya esta en uso');
            }
        }

        return await this.clienteRespository.save(client);

    }

    async removeCliente(id: number): Promise<void> {
        const result = await this.clienteRespository.delete(id);
        if (!result.affected) throw new NotFoundException('Cliente no encontrado');
    }

    async getRervasByCliente(id:number): Promise<Reserva[]>{
        const cliente = await this.clienteRespository.findOne({
            where: { id },
            relations: ['reservas']
        });
        if (!cliente) throw new NotFoundException('Cliente no encontrado');
        return cliente.reservas;
    }

    
}
