import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({
        type: String
    })
    content: string

    @ApiProperty({
        type: String,
        isArray: true
    })
    media: string[]

    @IsNotEmpty()
    @ApiProperty({
        type: Number
    })
    post_id: number
}
