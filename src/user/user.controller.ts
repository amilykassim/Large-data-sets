import { Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserUtils } from './user.util';
import { UserValidation } from './validations/user.validation';

@Controller('/api/v1')
export class UserController {
  private validatedUsers = [];

  constructor(
    private readonly userService: UserService,
    private readonly userUtil: UserUtils,
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
    const users = results.map(({ password, ...users }) => users);

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
    // divide large data sets into smaller chuncks
    const result = this.userUtil.divideDataSetsIntoChunks(this.validatedUsers, 500);

    // Commit records to db
    for (let i = 0; i < result.length; i++) {
      try {
        await this.userService.saveData(result[i]);
      } catch (error) {
        console.log('An error occurred while saving the users to the DB, here is the error: ', error)
        return res.status(200).json({ code: 500, message: 'Oops, something went wrong on our side, please try again later!' });
      }
    }

    return res.status(200).json({ code: 200, message: 'Saved users successfully!' });
  }
}
