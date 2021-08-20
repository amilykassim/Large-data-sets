import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserUtils } from './user.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userUtil: UserUtils,
  ) { }

  async createUser(obj: UserDTO): Promise<User> {
    // Check if a user already exists
    const user = await this.findByUsername(obj.name);
    if (user) return user;

    // if there is a validation error, then don't commit to DB
    if(obj['errors']) return;

    // Otherwise, instantiate a user object
    const { nid, name, phone, gender, email, password } = obj;
    const userObject = { nid, name, phone, gender, email, password };

    // hash password if provided available
    if(password) {
      const hashedPassword = await this.userUtil.hashPassword(password);
      userObject.password = hashedPassword;
    }

    // save user in the db
    const entity = await this.usersRepository.create(userObject);
    return await this.usersRepository.save(entity);
  }

  async findByUsername(name: string) {
    return await this.usersRepository.findOne({
      where: { name },
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }
}
