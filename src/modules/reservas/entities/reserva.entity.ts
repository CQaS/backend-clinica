import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { medico } from '../../medicos/entities/medico.entity';
import { EstadoReserva } from '../enums/estado-reserva';


@Entity('reservas')
export class reserva {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'id_medico'})
    idMedico: number;

    @Column({name:'id_paciente'})
    idPaciente: number;

    @Column({type:'datetime', default:() => 'CURRENT_TIMESTAMP'})
    fechaHora: Date;

    @Column({name:'valor_consulta'})
    valorConsulta: number;

    @Column({type: 'enum', enum: EstadoReserva, default: EstadoReserva})
    estado: EstadoReserva;
}