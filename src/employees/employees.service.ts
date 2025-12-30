import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const emp = this.employeeRepo.create(createEmployeeDto);
    return this.employeeRepo.save(emp);
  }

  findAll() {
    return this.employeeRepo.find({
      relations: ['address', 'bankDetails'], 
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ['address', 'bankDetails'],
    });
    
    // Safety Check: Throw error if ID doesn't exist
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    // This will now throw an error automatically if not found
    const emp = await this.findOne(id); 
    
    this.employeeRepo.merge(emp, updateEmployeeDto);
    return this.employeeRepo.save(emp);
  }
  
  async remove(id: number) {
    const result = await this.employeeRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Employee ${id} not found`);
    return { message: 'Deleted successfully' };
  }
}