import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserService } from './user/user.service';
import { RegisterUserValidation } from './user/validations/register-user.validation';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Get()
  getHello(@Request() req) {
    return this.appService.getHello()
  } 

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req, @Res() res) {
    const { access_token } = await this.authService.login(req.user);

    return res.status(200).json({ code: 200, access_token });
  }

  @Post('/auth/register')
  async register(@Body(RegisterUserValidation) request, @Res() res) {
    const { error } = request;
    if(error) return res.status(200).json({ code: 200, error: error.details[0].message});

    // check if username is unique
    const data = request.value;
    let userFound = await this.userService.findByUsername(data.name);
    if (userFound) return res.status(200).json({ code: 400, message: 'That name is already taken, try something else' });

    // create user
    const createdUser = await this.userService.createUser(data);
    const { password, ...user } = createdUser;

    // get the token
    const { access_token } = await this.authService.login(user);

    return res.status(200).json({ code: 200, user: user, access_token });
}
}
