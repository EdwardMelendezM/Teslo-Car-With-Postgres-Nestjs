/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto{

  @ApiProperty({
    description:"User email (unique)",
    default:"myuser@example.com",
    uniqueItems:true

  })
  @IsString()
  @IsEmail()
  email:string

  @ApiProperty({
    description:"The password must have a Uppercase, lowercase letter and a number",
    default:"myuser@example.com",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;
  
  @ApiProperty({
    description:"The name of the user",
    default:"Emmael"
  })
  @IsString()
  @MinLength(1)
  fullName:string

}