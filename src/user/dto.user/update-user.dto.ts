import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from "bcrypt";
import { IsEmail, IsNotEmpty, Validate, Matches } from "class-validator";
import { BeforeInsert, Unique } from "typeorm";

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Validate(Unique)
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;

  @BeforeInsert()
  hashPassword() {
    this.Password =  hashSync(this.Password, 10);
  }
}
