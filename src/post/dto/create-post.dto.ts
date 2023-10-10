import { ApiProperty } from "@nestjs/swagger"

export class CreatePostDto {
    @ApiProperty({
        type: String
    })
    content: string

    @ApiProperty({
        type: String,
        isArray: true
    })
    media: string[]

    @ApiProperty({
        type: Number,
        description: '0 - Chỉ mình tôi, 1 - Công khai'
    })
    view: number
}
