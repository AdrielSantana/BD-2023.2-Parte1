import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, GetUserDto, UserDto } from './dtos/user.dto';

@Injectable()
export class UserRepository {
  users: UserDto[] = [];

  createUser({ cpf, data_nascimento, nome }: CreateUserDto): UserDto {
    const user = this.users.find((user) => user.cpf === cpf);

    if (user) {
      throw new HttpException('Usuário já cadastrado.', HttpStatus.BAD_REQUEST);
    }

    this.users.push({ cpf, data_nascimento, nome });

    return {
      cpf,
      data_nascimento,
      nome,
    };
  }

  getUser({ cpf }: GetUserDto): UserDto {
    const user = this.users.find((user) => user.cpf === cpf);

    if (!user) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
