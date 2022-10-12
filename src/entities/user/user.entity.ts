import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ nullable: false })
  private name: string;

  @Column({ nullable: false, unique: true })
  private email: string;

  @Column({ nullable: false })
  private password: string;
}
