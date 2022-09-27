import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    fromId: string;

    @ApiProperty()
    @IsNotEmpty()
    toId: string;

    @ApiProperty()
    @IsNotEmpty()
    quantityTransfered: number
}