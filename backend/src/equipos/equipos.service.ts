import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipoDto } from './dto/create-equipo.dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto/update-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CreateEquipoDto) {
    return this.prisma.equipo.create({
      data,
    });
  }

  async listar() {
    return this.prisma.equipo.findMany();
  }

  async buscarPorId(id: number) {
    return this.prisma.equipo.findUnique({
      where: { id },
    });
  }

  async actualizar(id: number, data: UpdateEquipoDto) {
    return this.prisma.equipo.update({
      where: { id },
      data,
    });
  }

  async eliminar(id: number) {
    return this.prisma.equipo.delete({
      where: { id },
    });
  }
}