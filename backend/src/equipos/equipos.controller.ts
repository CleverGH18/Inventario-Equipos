import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto/update-equipo.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  crear(@Body() data: CreateEquipoDto) {
    return this.equiposService.crear(data);
  }

  @Get()
  listar() {
    return this.equiposService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.equiposService.buscarPorId(Number(id));
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() data: UpdateEquipoDto,
  ) {
    return this.equiposService.actualizar(Number(id), data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.equiposService.eliminar(Number(id));
  }
}