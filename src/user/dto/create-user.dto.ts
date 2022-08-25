import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Validate } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Validate(Unique)
    user: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @Validate(Unique)
    email: string;

    @ApiProperty()
    @IsPhoneNumber('BR')
    @IsNotEmpty()
    @Validate(Unique)
    phone: string;
}