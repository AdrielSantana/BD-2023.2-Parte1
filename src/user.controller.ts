import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto, GetUserDto, UserDto } from './dtos/user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário encontrado com sucesso',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'CPF não informado.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado.',
  })
  getUser(@Query() query: GetUserDto, @Res() res: Response) {
    if (!query.cpf) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: 'CPF não informado.' });
    }

    query.cpf = Number(query.cpf);

    const user = this.userRepository.getUser(query);

    return res.status(HttpStatus.OK).json(user);
  }

  @Post('')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Usuário já cadastrado.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Dados incompletos.',
  })
  createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (
      !createUserDto.cpf ||
      !createUserDto.data_nascimento ||
      !createUserDto.nome
    ) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: 'Dados incompletos.' });
    }

    createUserDto.cpf = Number(createUserDto.cpf);
    createUserDto.data_nascimento = new Date(createUserDto.data_nascimento);
    const user = this.userRepository.createUser(createUserDto);

    return res.status(HttpStatus.CREATED).json(user);
  }
}
