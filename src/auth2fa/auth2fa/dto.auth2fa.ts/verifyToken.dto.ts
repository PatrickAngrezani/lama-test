import { ApiProperty } from "@nestjs/swagger";

export class VerifyTokenDto {

    @ApiProperty()
    secret: string

    @ApiProperty()
    token: string
}