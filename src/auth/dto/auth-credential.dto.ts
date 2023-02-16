import { IsString, MinLength, MaxLength, Matches } from "class-validator"

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/ , {
        message: 'password is only alphabet and number'
    })
    password: string;
}