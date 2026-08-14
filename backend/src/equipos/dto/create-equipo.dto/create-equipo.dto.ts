import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipoDto {
  @ApiProperty({ example: 'Laptop' })
  nombre: string;

  @ApiProperty({ example: 'Lenovo' })
  marca: string;

  @ApiProperty({ example: 'ThinkPad E14' })
  modelo: string;

  @ApiProperty({ example: 'SN001' })
  numeroSerie: string;

  @ApiProperty({ example: 'Operativo' })
  estado: string;
}
