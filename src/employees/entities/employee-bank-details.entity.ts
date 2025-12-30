import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class EmployeeBankDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: string;

  @Column()
  bankName: string;

  @Column()
  ifscCode: string;

  // Creating the 'employee_id' column in this table
  @OneToOne(() => Employee, (employee) => employee.bankDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}