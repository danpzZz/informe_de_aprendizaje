import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InformesService } from './informes.service';

@Controller('informes')
export class InformesController {
  constructor(private readonly informesService: InformesService) {}

  @Get('datos-iniciales/:internshipId')
  getDatosIniciales(@Param('internshipId') internshipId: string) {
    return this.informesService.getDatosIniciales(Number(internshipId));
  }

  @Get('learning-logs/:internshipId')
  getLearningLogs(@Param('internshipId') internshipId: string) {
    return this.informesService.getLearningLogs(Number(internshipId));
  }

  @Post('learning-logs')
  guardarLearningLogs(@Body() body: any) {
    return this.informesService.guardarLearningLogs(body);
  }

  @Delete('learning-logs/:id')
  eliminarLearningLog(@Param('id') id: string) {
    return this.informesService.eliminarLearningLog(Number(id));
  }
}