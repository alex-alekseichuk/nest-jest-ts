import { Injectable } from '@nestjs/common';
import { UserToken } from './user-token';
import { generate } from 'randomstring';

@Injectable()
export class UserTokenService {
  generateToken(): UserToken {
    return new UserToken(generate());
  }
}
