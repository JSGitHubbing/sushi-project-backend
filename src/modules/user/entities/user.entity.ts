import { AuthUser } from 'src/core/auth/api/entities';
import { Image } from 'src/modules/image/entities/image/image.entity';
import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToOne(() => AuthUser)
  @JoinColumn({ name: 'auth_user_id' })
  authUser: AuthUser;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;
}
