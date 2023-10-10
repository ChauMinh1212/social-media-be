import { ApiProperty } from "@nestjs/swagger"

export class UserResponseCommon {
    @ApiProperty({
        type: Number
    })
    id: number

    @ApiProperty({
        type: String
    })
    user_name: string

    @ApiProperty({
        type: String
    })
    description: string

    @ApiProperty({
        type: String
    })
    email: string

    @ApiProperty({
        type: String
    })
    avatar: string

    constructor(data?: UserResponseCommon){
        this.id = data?.id || 0
        this.user_name = data?.user_name || ''
        this.description = data?.description || ''
        this.email = data?.email || ''
        this.avatar = data?.avatar || ''  
    }


    static mapToList(data?: UserResponseCommon[]){
         return data.map(item => new UserResponseCommon(item))
    }
}