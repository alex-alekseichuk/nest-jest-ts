import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenService } from './token/user-token.service';
import { UserService } from './user.service';
import { UserToken } from './token/user-token';

describe('UserService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [UserService, UserTokenService],
    }).compile();
  });

  describe('login', () => {
    it('should return undefined for incorrect login', () => {
      const userService = app.get<UserService>(UserService);
      expect(userService.login('', '')).toBeUndefined();
    });
    it('should return a UserToken', () => {
      const userService = app.get<UserService>(UserService);
      const reply = userService.login('admin@admin.ru','12345678');
      expect(reply).toBeInstanceOf(UserToken);
      expect(reply.token).toBeDefined();
    });
  });
});
