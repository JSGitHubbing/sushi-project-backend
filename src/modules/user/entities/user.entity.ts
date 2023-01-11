import { Image } from "src/modules/image/entities/image.entity";
import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column({ default: false, name: 'active' })
    isActive: boolean;

    @Column({ default: true, select: false, name: 'enabled' })
    isEnabled: boolean;

    @OneToOne(() => Image)
    @JoinColumn({ name: 'image_id' })
    image: Image;
}
