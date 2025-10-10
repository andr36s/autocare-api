import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { MaintenanceService } from './maintenance/maintenance.service';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.develoment'],
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB || ''),
    MaintenanceModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
