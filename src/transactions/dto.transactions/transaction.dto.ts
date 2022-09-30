import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, NotEquals, Validate } from "class-validator";


export class TransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    fromId: string;

    @ApiProperty()
    @IsNotEmpty()
    @NotEquals('fromId')
    @IsUUID()
    toId: string;

    @ApiProperty()
    @IsNotEmpty()
    quantityTransfered: number
}