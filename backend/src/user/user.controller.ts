import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string, @Req() req) {
    const userId = req.user.iss;
    if (userId !== id) {
      return {
        result: false,
        message: '유저를 찾을 수 없습니다.',
      };
    }
    const user = this.userService.getUserById(id);
    return user;
  }
}
