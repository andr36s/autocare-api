import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { MaintenanceService } from './maintenance/maintenance.service';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
  imports: [MaintenanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
