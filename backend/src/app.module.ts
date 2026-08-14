import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EquiposModule } from './equipos/equipos.module';

@Module({
  imports: [PrismaModule, EquiposModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
