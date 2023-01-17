
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { AuthUser } from "..";

@Entity()
export class AuthUserToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => AuthUser)
    @JoinColumn({ name: 'auth_user_id' })
    authUser: AuthUser;
}
