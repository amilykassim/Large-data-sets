import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './user.service';
import { UserValidation } from './user.validation';

@Controller('/api/v1')
export class AppController {
  private validatedUsers = [];

  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('/users')
  async getUncommittedUsers(@Res() res) {
    const users = await this.validatedUsers;

    return res.status(200).json({ code: 200, data: users });
  }

  @Get('/users/committed')
  async getCommittedUsers(@Res() res) {
    const users = await this.appService.findAll();

    return res.status(200).json({ code: 200, data: users });
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileOfUsers(@UploadedFile(UserValidation) request: Express.Multer.File, @Res() res) {
    // add validated results to the validated users array
    this.validatedUsers = request['users'];

    // if data is invalid
    if (!request['isDataValid']) return res.status(200).json({ code: 200, message: 'There are invalid data' });

    // if the data is valid
    return res.status(200).json({ code: 200, message: 'All data are valid' });
  }

  @Post('/users')
  async commitUsersToDB(@Res() res) {
    // Commit each record on the db
    this.validatedUsers.forEach(async (user) => {
      try {
        await this.appService.createUser(user);
      } catch (error) {
        console.error(`An error occured while saving this ${JSON.stringify(user)} to DB, here is the reason: `, error);
      }
    });

    return res.status(200).json({ code: 200, message: 'Saved users successfully!' });
  }
}
