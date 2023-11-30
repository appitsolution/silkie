import { Role } from 'src/constants/roles';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class users {
  @PrimaryColumn()
  id: string;

  @Column({ default: Role.OWNER })
  role: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
