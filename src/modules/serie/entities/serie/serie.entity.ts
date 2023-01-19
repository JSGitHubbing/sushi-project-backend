import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Image } from 'src/modules/image/entities/image/image.entity';
import { Season } from '../season/season.entity';

@Entity()
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @OneToMany(() => Season, (season) => season.serie)
  seasons: Season[];
}
