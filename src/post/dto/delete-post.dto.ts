import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeletePostDto {
    @IsNotEmpty()
    @ApiProperty({
        type: Number
    })
    id: number
}