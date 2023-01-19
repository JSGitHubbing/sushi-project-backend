import { ApiProperty } from "@nestjs/swagger";

export class ImageDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    path: string;
}