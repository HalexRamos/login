import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  hash: string;

  @Column()
  email: string;
}
