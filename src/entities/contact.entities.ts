import { Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn ,Column, CreateDateColumn } from 'typeorm';
import User from './user.entities';
@Entity()

export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ length: 250, nullable: false })
  email: string;

  @Column({ length: 15, nullable: false })
  phoneNumber: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ManyToOne(() => User, user => user.contatos,  { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Contact