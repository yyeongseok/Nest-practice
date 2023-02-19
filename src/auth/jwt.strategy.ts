import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt,Strategy } from "passport-jwt"
import { UserRepository } from "./user.repository"
import { InjectRepository } from "@nestjs/typeorm"


@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: { username: string; }) {
        const { username } = payload;
        const user = await this.userRepository.findOneBy({ username })

        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}