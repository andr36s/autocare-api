import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { MaintenanceDTO } from './dto/maintenance.dto';
import { MaintenanceService } from './maintenance.service';

@Controller('maintenance')
export class MaintenanceController {

    constructor(private readonly maintenanceService: MaintenanceService) {}

    @Get() // Sirve para consultar
    findAll() {
        return this.maintenanceService.findAll();
    }

    @Get(':id') // Sirve para consultar por id
    findOne(@Param("id") id: string) {
        return this.maintenanceService.findOne(id);
    }

    @Post() // Sirve para crear
    create(@Body() maintenanceDTO: MaintenanceDTO ) {
        return this.maintenanceService.create(maintenanceDTO);
    }

    @Put(':id') // Sirve para actualizar total
    update(@Param("id") id: string, @Body() maintenanceDTO: MaintenanceDTO) {
        return this.maintenanceService.update(id, maintenanceDTO);
    }

    @Patch() // Sirve para actualizar parcial
    methodPatch(@Req() req: Request) {
        return `Method ${req.method} called`;
    }

    @Delete(':id') // Sirve para eliminar
    delete(@Param("id") id: string) {
        return this.maintenanceService.delete(id);
    }
}
