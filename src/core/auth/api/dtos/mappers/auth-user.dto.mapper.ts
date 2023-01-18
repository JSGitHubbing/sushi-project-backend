import { AuthUser } from "../../entities";
import { AuthUserDto } from "../auth-user.dto";

export const AuthUserMapper = (entity: AuthUser): AuthUserDto => {
    return {
        id: entity.id,
        isActive: entity.isActive,
        username: entity.username
    }
}