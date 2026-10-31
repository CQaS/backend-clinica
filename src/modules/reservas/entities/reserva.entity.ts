import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Medico } from '../../medicos/entities/medico.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EstadoReserva } from '../enums/estado-reserva';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_medico', type: 'int' })
  medicoId: number;

  @Column({ name: 'id_paciente', type: 'int' })
  pacienteId: number;

  @Column({ name: 'fecha_hora', type: 'timestamp' })
  fechaHora: Date;

  @Column({
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.ACTIVO,
  })
  estado: EstadoReserva;

  @Column({ name: 'valor_consulta', type: 'int' })
  valorConsulta: number;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'id_medico' })
  medico: Medico;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_paciente' })
  paciente: Usuario;
}
