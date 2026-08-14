import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquiposService {
  constructor(private prisma: PrismaService) {}

  async crear(data: {
    nombre: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    estado: string;
  }) {
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

  async actualizar(
    id: number,
    data: {
      nombre: string;
      marca: string;
      modelo: string;
      numeroSerie: string;
      estado: string;
    },
  ) {
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