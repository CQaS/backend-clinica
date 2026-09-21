import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('medicos')
export class medico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'id_usuario'})
    idUsuario: number;

    @ManyToOne(()=>Usuario)
    @JoinColumn({name:'id_usuario'})
    Usuario: Usuario

    @Column()
    matricula: number;

    @Column({name:'valor_consulta'})
    valorConsulta: number;
}