import { Image } from "src/modules/image/entities/image.entity";

export interface UserDto {
    id: number;
    name: string;
    surname: string;
    image: Image;
}