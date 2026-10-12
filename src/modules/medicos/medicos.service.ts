import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';
import { EstadoUsuario } from '../usuarios/enums/estados-usuarios.enum';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async findAll(): Promise<Medico[]> {
    return await this.medicoRepository.find({
      relations: ['usuario'],
    });
  }

  
  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!medico) {
      throw new NotFoundException(`No se encontró el médico con ID ${id}`);
    }

    return medico;
  }

  async findByUsuarioId(idUsuario: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({
      where: { idUsuario },
      relations: ['usuario'],
    });

    if (!medico) {
      throw new NotFoundException(
        `No existe perfil de médico asociado al usuario ${idUsuario}`,
      );
    }

    if (medico.usuario && medico.usuario.estado !== EstadoUsuario.ACTIVO) {
      throw new BadRequestException('El médico asociado se encuentra en estado BAJA');
    }

    return medico;
  }

  async actualizarValorConsulta(
    id: number,
    dto: ActualizarValorConsultaDto,
  ): Promise<Medico> {
    const medico = await this.findOne(id);

    medico.valorConsulta = dto.valorConsulta;

    return await this.medicoRepository.save(medico);
  }
}