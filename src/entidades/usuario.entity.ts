import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EstadosUsuarios {
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}

export enum RolesUsuarios {
  MEDICO = 'MEDICO',
  PACIENTE = 'PACIENTE',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

@Entity('usuarios')
export class UsuarioEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documento: string;

  @Column()
  apellidos: string;

  @Column()
  nombres: string;

  @Column()
  email: string;

  @Column()
  clave: string;

  @Column({
    type: 'enum',
    enum: EstadosUsuarios,
    default: EstadosUsuarios.ACTIVO,
  })
  estado: EstadosUsuarios;

  @Column({ type: 'enum', enum: RolesUsuarios })
  rol: RolesUsuarios;
}
