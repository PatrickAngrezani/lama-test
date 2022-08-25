import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('BR')
    @IsNotEmpty()
    phone: string;
}