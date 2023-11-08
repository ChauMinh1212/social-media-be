import { ApiProperty } from "@nestjs/swagger";

export class ParamIdDto {
    @ApiProperty({
        type: Number
    })
    id: number
}