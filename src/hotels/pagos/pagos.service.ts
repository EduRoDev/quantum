import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/models/clientes.models';
import { Pago } from 'src/models/pagos.models';
import { Reserva } from 'src/models/reservas.models';
import { DataSource, Repository } from 'typeorm';
import { CreatePagosDto } from './DTO/create-pagos.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private PagosRepository: Repository<Pago>,
    @InjectRepository(Reserva)
    private reservaRepo: Repository<Reserva>,
    @InjectRepository(Clientes)
    private clienteRepo: Repository<Clientes>,
    private datasource: DataSource,
  ) {}

  async createPago(dto: CreatePagosDto): Promise<Pago> {
    return await this.datasource.transaction(async (manager) => {
      const [reserva, cliente] = await Promise.all([
        this.reservaRepo.findOne({ where: { id: dto.reserva_id } }),
        this.clienteRepo.findOne({ where: { id: dto.cliente_id } }),
      ]);
      if (!reserva) throw new Error('Reserva no encontrada');
      if (!cliente) throw new Error('Cliente no encontrado');
      const pago = manager.create(Pago, {
        ...dto,
        reserva,
        cliente,
      });

      const pagoGuardado = await manager.save(Pago, pago);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      pagoGuardado.Estado = 'completado';
      await manager.save(Pago, pagoGuardado);

      reserva.estado = 'pagada';
      await manager.save(Reserva, reserva);

      return pagoGuardado;
    });
  }

  async obtenerPagos(clienteId: number): Promise<Pago[]> {
    return this.PagosRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['reserva'],
    });
  }

  async reembolsarPago(pagoId: number): Promise<Pago> {
    return await this.datasource.transaction(async (manager) => {
        const pago = await manager.findOne(Pago, {
            where: { Id: pagoId },
            relations: ['reserva'],
        });

        if (!pago) throw new Error('Pago no encontrado');
        if (pago.Estado !== 'completado')
            throw new Error('Solo se puede reembolsar pagos completados');

        pago.Estado = 'reembolsado';
        const pagoActualizado = await manager.save(Pago, pago);

        if (pago.reserva) {
            pago.reserva.estado = 'pendiente';
            await manager.save(Reserva, pago.reserva);
        }

        return pagoActualizado;
    });
}

async cancelarPago(pagoId: number): Promise<Pago> {
    return await this.datasource.transaction(async (manager) => {
        const pago = await manager.findOne(Pago, {
            where: { Id: pagoId },
            relations: ['reserva'],
        });

        if (!pago) throw new Error('Pago no encontrado');
        if (pago.Estado !== 'completado')
            throw new Error('Solo se puede cancelar pagos completados');

        pago.Estado = 'cancelado';
        const pagoActualizado = await manager.save(Pago, pago);

        if (pago.reserva) {
            pago.reserva.estado = 'cancelada';
            await manager.save(Reserva, pago.reserva);
        }

        return pagoActualizado;
    });
}
}
