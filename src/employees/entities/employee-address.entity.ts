import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class EmployeeAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;
  
  @Column()
  zipCode: string;

  // Creating 'employee_id' column in this table
  @OneToOne(() => Employee, (employee) => employee.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' }) 
  employee: Employee;
}