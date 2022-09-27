/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class updateUserSwagger {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}

