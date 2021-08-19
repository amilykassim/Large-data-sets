import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // check if username is valid
    const searchedUser = await this.authService.findUser(username);
    if (!searchedUser) throw new UnauthorizedException();
    
    // check if password is valid
    const isValid = await this.authService.comparePassword(password, searchedUser.password);
    if (!isValid) throw new UnauthorizedException();

    return searchedUser;
  }
}
