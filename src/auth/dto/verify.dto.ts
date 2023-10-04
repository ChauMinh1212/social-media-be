import { ApiProperty } from "@nestjs/swagger";

export class VerifyAccountDto {
    @ApiProperty({
        type: Number
    })
    code: number
}