
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UserUtils } from 'src/user/user.util';
const Joi = require('joi');

@Injectable()
export class UserValidation implements PipeTransform {
  constructor(
    private readonly userUtil: UserUtils,
  ) { }
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    let isDataValid = true;

    // parse file buffer data to JSON data
    const users = this.userUtil.parseBufferToJSON(file);

    // loop and validate each record
    users.forEach(user => {
      const { error } = this.validate(user);

      // if there is an error, append the error to the record object
      if (error) {
        isDataValid = false;
        user['errors'] = error.message;
      }
    });

    return { users, isDataValid };
  }

  private validate(data) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(50).required(),
      nid: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
      phone: Joi.string().length(12).pattern(/^[0-9]+$/).required().required(),
      gender: Joi.string().valid("M", "F"),
      email: Joi.string().email().required(),
    });

    return schema.validate(data);
  }
}