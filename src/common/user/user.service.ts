import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';

@Injectable()
export class UserService {
  private users = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  constructor(
    private readonly userTokenService: UserTokenService,
  ) {}

  /**
   * Check email/password
   * @param email
   * @param password
   * @return UserToken or undefined if there is not such account
   */
  login(email, password) {
    let user = this.users.find(user =>
      user.email === email && user.password === password);
    if (!user)
      return;
    return this.userTokenService.generateToken();
  }
}
