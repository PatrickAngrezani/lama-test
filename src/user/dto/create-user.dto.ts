import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    execute(arg0: { user: any; email: any; phone: any; }) {
      throw new Error('Method not implemented.');
    }
    exec(arg0: {}) {
        throw new Error('Method not implemented.');
    }
    
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber('BR')
    @IsNotEmpty()
    phone: string;
}