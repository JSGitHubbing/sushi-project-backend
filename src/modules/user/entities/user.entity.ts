import { Image } from "src/modules/image/entities/image.entity";
import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @OneToOne(() => Image)
    @JoinColumn({ name: 'image_id' })
    image: Image;
}
