import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/models/usuarios.models';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Usuario)
        private userRepository: Repository<Usuario>
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<Usuario> {
        const usuario = await this.userRepository.findOne({ where: { id } });
        if (!usuario) throw new NotFoundException('Usuario no encontrado');
        return usuario;
      }

    async create(usuario: Usuario): Promise<Usuario> {
        const NewUsuario = await this.userRepository.save(usuario);
        return NewUsuario;
    }

    async update(id: number, dataUsuario: Partial<Usuario>): Promise<Usuario | null> {
        const usuarioExistente = await this.userRepository.findOne({ where: { id } });
        if (!usuarioExistente) return null;
      
        const usuarioActualizado = this.userRepository.merge(usuarioExistente, dataUsuario);
        return await this.userRepository.save(usuarioActualizado);
      }


    async delete(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException('Usuario no encontrado');
        }
        
      }
      

}
