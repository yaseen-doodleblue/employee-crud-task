import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { EmployeeAddress } from './employee-address.entity';
import { EmployeeBankDetails } from './employee-bank-details.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  department: string;

  @Column()
  salary: number;

  // Relation to Address (Cascade allows saving address via employee)
  @OneToOne(() => EmployeeAddress, (address) => address.employee, { cascade: true })
  address: EmployeeAddress;

  // Relation to Bank Details
  @OneToOne(() => EmployeeBankDetails, (bank) => bank.employee, { cascade: true })
  bankDetails: EmployeeBankDetails;
}