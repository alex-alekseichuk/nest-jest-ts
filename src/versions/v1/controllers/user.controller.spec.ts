import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../common/user/user.service';
import { UserToken } from '../../../common/user/token/user-token';
import { HttpStatus } from '@nestjs/common';

jest.mock('../../../common/user/user.service');

describe('UserController', () => {
  let app: TestingModule;
  let userService: UserService;

  const mockReq = (): any => ({
    body: {}
  });
  const mockRes = (): any => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  });
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [<jest.Mock<UserService>>UserService]
    }).compile();
    userService = app.get(UserService);
  });

  describe('login', () => {
    it('should reply 401 on incorrect login', () => {
      const userController = app.get<UserController>(UserController);
      let login = jest.spyOn(userService, 'login');
      login.mockImplementation((): UserToken => undefined);
      const res = mockRes();

      userController.login(mockReq(), res);

      expect(login).toBeCalled();
      expect(res.status).toBeCalledWith(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('login', () => {
    it('should reply token on correct login', () => {
      const userController = app.get<UserController>(UserController);
      let login = jest.spyOn(userService, 'login');
      const token = new UserToken('token1');
      login.mockImplementation((): UserToken => token);
      const res = mockRes();

      userController.login(mockReq(), res);

      expect(login).toBeCalled();
      expect(res.json).toBeCalledWith(token);
    });
  });
});
