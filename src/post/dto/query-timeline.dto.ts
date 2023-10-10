import { ApiProperty } from "@nestjs/swagger";

export class TimelineQueryDto {
    @ApiProperty({
        type: Number,
        description: 'Lấy bài viết bình thường truyền -1, còn của một ai đó truyền id ng đó lên'
    })
    user_id: number
}