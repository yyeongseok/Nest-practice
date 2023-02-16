import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    signUp( @Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto) : Promise<void>{
        return this.authService.SignUp(AuthCredentialDto)
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto) : Promise<{accessToken: string}> {
        return this.authService.SignIn(AuthCredentialDto)
    }
}
