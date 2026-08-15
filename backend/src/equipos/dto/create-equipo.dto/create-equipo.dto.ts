import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEquipoDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'Lenovo' })
  @IsString()
  @IsNotEmpty()
  marca!: string;

  @ApiProperty({ example: 'ThinkPad E14' })
  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @ApiProperty({ example: 'SN001' })
  @IsString()
  @IsNotEmpty()
  numeroSerie!: string;

  @ApiProperty({ example: 'Operativo' })
  @IsString()
  @IsNotEmpty()
  estado!: string;
}
