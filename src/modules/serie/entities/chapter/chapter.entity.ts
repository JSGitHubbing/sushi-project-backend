import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Season } from '../season/season.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'chapter_number' })
  chapterNumber: number;

  @Column()
  path: string;

  @ManyToOne(() => Season, (season) => season.chapters)
  @JoinColumn({ name: 'season_id' })
  season: Season;
}
