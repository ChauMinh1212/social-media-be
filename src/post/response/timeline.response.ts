import { ApiProperty } from "@nestjs/swagger"
import { BaseResponse } from "../../util/response/response"
import { UserResponseCommon } from "../../util/response/user.response"
import { PostEntity } from "../entities/post.entity"

export class TimelineResponse {
    @ApiProperty({
        type: Number
    })
    id: number

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
        type: Number
    })
    no_of_love: number

    @ApiProperty({
        type: UserResponseCommon
    })
    user: UserResponseCommon

    constructor(data?: PostEntity) {
        this.id = data?.id || 0
        this.content = data?.content || ''
        this.media = data?.media || []
        this.no_of_love = data?.no_of_love || 0
        this.user = data?.user || new UserResponseCommon(data?.user)
    }

    static mapToList(data?: PostEntity[]) {
        return data.map(item => new TimelineResponse(item))
    }
}

export class TimelineResponseSwagger extends BaseResponse {
    @ApiProperty({
        type: TimelineResponse,
        isArray: true
    })
    data: TimelineResponse[]
}