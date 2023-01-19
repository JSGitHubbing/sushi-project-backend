import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Chapter } from '../chapter/chapter.entity';
import { Serie } from '../serie/serie.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'season_number' })
  seasonNumber: number;

  @ManyToOne(() => Serie, (serie) => serie.seasons)
  @JoinColumn({ name: 'serie_id' })
  serie: Serie;

  @OneToMany(() => Chapter, (chapter) => chapter.season)
  chapters: Chapter[];
}
