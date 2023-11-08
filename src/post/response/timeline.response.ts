import { ApiProperty } from "@nestjs/swagger"
import { Moment } from "moment"
import { BaseResponse, UserResponseCommon } from "../../util/response"
import { UtilCommonTemplate } from "../../util/util.common"
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

    @ApiProperty({
        type: String
    })
    created_at: string | Date

    @ApiProperty({
        type: String
    })
    updated_at: string | Date

    constructor(data?: PostEntity) {
        this.id = data?.id || 0
        this.content = data?.content || ''
        this.media = data?.media || []
        this.no_of_love = data?.no_of_love || 0
        this.user = data?.user || new UserResponseCommon(data?.user)
        this.created_at = data?.created_at ? UtilCommonTemplate.getDate(data?.created_at) : ''
        this.updated_at = data?.updated_at ? UtilCommonTemplate.getDate(data?.updated_at) : ''
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