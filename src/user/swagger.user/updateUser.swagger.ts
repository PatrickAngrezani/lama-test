/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Validate, Matches } from "class-validator";
import { Unique } from "typeorm";

export class updateUserSwagger {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Validate(Unique)
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}

