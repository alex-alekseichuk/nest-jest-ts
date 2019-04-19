import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenService } from './user-token.service';
import { UserToken } from './user-token';

describe('UserTokenService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [UserTokenService],
    }).compile();
  });

  describe('generateToken', () => {
    it('should return a UserToken', () => {
      const userTokenService = app.get<UserTokenService>(UserTokenService);
      expect(userTokenService.generateToken()).toBeInstanceOf(UserToken);
      expect(userTokenService.generateToken().token).toBeDefined();
    });
  });
});
