import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    execute(arg0: { user: any; email: any; phone: any; }) {
      throw new Error('Method not implemented.');
    }
    exec(arg0: {}) {
        throw new Error('Method not implemented.');
    }
    
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