import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity
} from 'typeorm';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @UpdateDateColumn({
    name: 'updated-at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'user',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 50,
  })
  user: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  email: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
  })
  phone: string;
}