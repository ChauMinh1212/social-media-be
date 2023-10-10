import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends CreatePostDto {
    @IsNotEmpty()
    @ApiProperty({
        type: Number
    })
    id: number
}
