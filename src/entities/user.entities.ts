import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn,BeforeInsert, BeforeUpdate,CreateDateColumn ,Column, Unique } from 'typeorm';
import {hashSync, getRounds} from 'bcryptjs';
import Contact from './contact.entities';
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 250, nullable: false })
  email: string;

  @Column({ length: 15, nullable: false })
  phoneNumber: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
      const isEncrypted = getRounds(this.password)
      if(!isEncrypted){
          this.password = hashSync(this.password, 10)
      }
  }
  @OneToMany(() => Contact, contact => contact.user)
  @JoinColumn({ name: 'user_id' })
  contatos: Contact[];
}

export default User