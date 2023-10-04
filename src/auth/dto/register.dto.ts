import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {
    @ApiProperty({
        type: String
    })
    email: string

    @ApiProperty({
        type: String
    })
    user_name: string

    @ApiProperty({
        type: String
    })
    avatar: string

    @ApiProperty({
        type: String
    })
    password: string
}