import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
