import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@Req() req) {
    const userId = req.user.iss;
    const user = this.userService.getUserById(userId);

    return user;
  }

  @Post('find')
  findUserByEmail(@Body() email: string) {
    const user = this.userService.getUser(email);
    return user;
  }
}
