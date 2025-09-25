import { Injectable } from '@nestjs/common';
import { MaintenanceDTO } from './dto/maintenance.dto';
import { IMaintenance } from './interface/maintenance.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MaintenanceService {
    maintenances: IMaintenance[] = [];

    create(maintenanceDTO: MaintenanceDTO): IMaintenance {
        const maintenance = {
            id: uuidv4(),
            ...maintenanceDTO,
        }

        this.maintenances.push(maintenance);
        console.log(this.maintenances);
        return maintenance;
    }

    findAll(): IMaintenance[] {
        return this.maintenances;
    }

    findOne(id: string): IMaintenance | undefined {
        return this.maintenances.find((maintenance) => maintenance.id === id);
    }

    update(id: string, maintenanceDTO: MaintenanceDTO): IMaintenance | void {
        const newMaintenance = { id, ...maintenanceDTO }

        this.maintenances = this.maintenances.map((maintenance) => {
            return maintenance.id === id ? newMaintenance : maintenance 
        })

        return newMaintenance;
    }

    delete(id: string): string{
        this.maintenances = this.maintenances.filter((maintenance) => maintenance.id !== id)
        return `La información con el id ${id} ha sido eliminada`;
    }
}
