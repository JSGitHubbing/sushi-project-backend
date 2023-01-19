import { ApiProperty } from "@nestjs/swagger";
import { ImageDto } from "src/modules/image/dto/image.dto";

export class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    image: ImageDto;
}