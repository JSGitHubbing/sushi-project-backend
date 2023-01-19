import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from 'src/modules/image/entities/image/image.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  videoPath: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;
}
