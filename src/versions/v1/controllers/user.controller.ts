import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../../common/user/user.service';
import { UserToken } from '../../../common/user/token/user-token';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    let token: UserToken = this.userService.login(
      req.body['email'],
      req.body['password']
    );

    if (token) {
      res.json(token);
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: "Unauthorized"
      });
    }
  }
}
