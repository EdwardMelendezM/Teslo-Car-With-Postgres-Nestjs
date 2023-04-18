/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {JwtPayload} from "../interfaces/jwt-payload.interface"
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService:ConfigService
  ){
    super({
      secretOrKey:configService.get('JWT_SECRET'),
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }
  async validate(payload:JwtPayload):Promise<any>{
      const {id} = payload
      const user = await this.userRepository.findOneBy({id})
      if(!user) throw new UnauthorizedException('Token not valid')

      if(!user.isActive) throw new UnauthorizedException('User is inactive, talk with an admin') 
      console.log(user);
    return user;
  }
}