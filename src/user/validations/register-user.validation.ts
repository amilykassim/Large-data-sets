
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UserUtils } from 'src/user/user.util';
import { UserDTO } from '../dtos/user.dto';
const Joi = require('joi');

@Injectable()
export class RegisterUserValidation implements PipeTransform {
  transform(user: UserDTO, metadata: ArgumentMetadata) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(50).required(),
      nid: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
      phone: Joi.string().length(12).pattern(/^[0-9]+$/).required().required(),
      gender: Joi.string().valid("M", "F"),
      email: Joi.string().email().required(),
      password: Joi.string(),
    });

    return schema.validate(user);
  }
}