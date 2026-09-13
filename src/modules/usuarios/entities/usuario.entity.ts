import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Rol } from '../enums/rol.enum';
import { EstadoUsuario } from '../enums/estado-usuario.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documento: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  email: string;

  @Column()
  clave: string;

  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    default: EstadoUsuario.ACTIVO,
  })
  estado: EstadoUsuario;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.PACIENTE,
  })
  rol: Rol;

  @Column({ nullable: true })
  mensajePersonalizado?: string;
}
