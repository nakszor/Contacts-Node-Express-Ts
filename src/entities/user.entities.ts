import { Entity, PrimaryGeneratedColumn, CreateDateColumn ,Column, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ length: 15, nullable: false })
  phone: string;

  @Column({ length: 250, nullable: false })
  email: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

}

export default User