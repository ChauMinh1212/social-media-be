import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class RegisterDto {
    @IsEmail()
    @ApiProperty({
        type: String
    })
    email: string

    @IsNotEmpty()
    @ApiProperty({
        type: String
    })
    user_name: string

    @ApiProperty({
        type: String
    })
    avatar: string

    @IsNotEmpty()
    @ApiProperty({
        type: String
    })
    password: string
}