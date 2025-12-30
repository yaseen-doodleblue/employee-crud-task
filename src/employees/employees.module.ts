import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { EmployeeAddress } from './entities/employee-address.entity';      
import { EmployeeBankDetails } from './entities/employee-bank-details.entity';  
@Module({
  imports: [
    // Register all 3 entities here so TypeORM loads them
    TypeOrmModule.forFeature([Employee, EmployeeAddress, EmployeeBankDetails]) 
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}