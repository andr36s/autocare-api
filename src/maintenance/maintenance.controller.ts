import { Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';

@Controller('maintenance')
export class MaintenanceController {

    @Get() // Sirve para consultar
    methodGet(@Req() req: Request) {
        return `method ${req.method} called`;
    }

    @Post(':id') // Sirve para crear
    methodPost(@Param('id') id: string) {
        return `id ${id}.`;
    }

    @Put() // Sirve para actualizar total
    methodPut(@Req() req: Request) {
        return `Method ${req.method} called`;
    }

    @Patch() // Sirve para actualizar parcial
    methodPatch(@Req() req: Request) {
        return `Method ${req.method} called`;
    }

    @Delete() // Sirve para eliminar
    methodDelete(@Req() req: Request) {
        return `Method ${req.method} called`;
    }
}
