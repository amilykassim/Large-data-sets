import { Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserValidation } from './validations/user.validation';

@Controller('/api/v1')
export class UserController {
  private validatedUsers = [];

  constructor(
    private readonly userService: UserService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getUncommittedUsers(@Res() res) {
    const users = await this.validatedUsers;

    return res.status(200).json({ code: 200, data: users });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/committed')
  async getCommittedUsers(@Res() res) {
    const results = await this.userService.findAll();

    // remove password
    const users = results.map(({ password, ...users}) => users);

    return res.status(200).json({ code: 200, data: users });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/users/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileOfUsers(@UploadedFile(UserValidation) request: Express.Multer.File, @Res() res) {
    // add validated results to the validated users array
    this.validatedUsers = request['users'];

    // if data is invalid
    if (!request['isDataValid']) return res.status(200).json({ code: 200, message: 'There are invalid data' });

    // if the data is valid
    return res.status(200).json({ code: 200, message: 'All data are valid' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/users')
  async commitUsersToDB(@Res() res) {
    // Commit each record on the db
    this.validatedUsers.forEach(async (user) => {
      try {
        await this.userService.createUser(user);
      } catch (error) {
        console.error(`An error occured while saving this ${JSON.stringify(user)} to DB, here is the reason: `, error);
      }
    });

    return res.status(200).json({ code: 200, message: 'Saved users successfully!' });
  }
}
