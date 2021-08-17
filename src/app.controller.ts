import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
// Requiring the module
const reader = require('xlsx');
const Joi = require('joi');
const excel = require('excel4node');

@Controller('/api/v1')
export class AppController {
  private users = [];
  constructor(private readonly appService: AppService) { }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // parse buffer to JSON
    this.users = this.parseBufferToJSON(file);

    this.convertPhoneNumberToString(this.users);

    // validate the users data
    this.users.forEach(user => {
      const { error } = this.validate(user);
      if (error) user['errors'] = error.message;
    });
   

    return 'Valid data';
  }

  validate(data) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(50).required(),
      nid: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
      phone: Joi.string().length(12).pattern(/^[0-9]+$/).required().required(),
      gender: Joi.string().valid("M", "F"),
      email: Joi.string().email().required(),
    });

    return schema.validate(data);
  }

  convertPhoneNumberToString(users) {
    users.forEach(user => {
      user['phone'] = user['phone'].toString();
    });
  };

  @Get('/users')
  getUsers() {
    return this.users;
  }

  parseBufferToJSON(myFile: Express.Multer.File) {
    const file = reader.read(myFile.buffer);
    let data = []

    const sheets = file.SheetNames
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
      temp.forEach((res) => {
        data.push(res)
      });
    }

    return data;
  }
}

 // this.users = [
    //   {
    //     "nid": "1199880000270041",
    //     "name": "",
    //     "phone": 250782228,
    //     "gender": "B",
    //     "email": "amily@gmail.com"
    //   },
    // ];
