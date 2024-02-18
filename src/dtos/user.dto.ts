import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'CPF do usuário' })
  cpf: number;

  @ApiProperty({ description: 'Nome do usuário' })
  nome: string;

  @ApiProperty({ description: 'Data de nascimento do usuário' })
  data_nascimento: Date;
}

export class CreateUserDto extends UserDto {}

export class GetUserDto {
  @ApiProperty({ description: 'CPF do usuário a ser buscado' })
  cpf: number;
}
