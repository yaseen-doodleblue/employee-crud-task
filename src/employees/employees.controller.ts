import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe, 
  Res, 
  NotFoundException 
} from '@nestjs/common';
import type { Response } from 'express'; 
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';    

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createDto: CreateEmployeeDto) {
    return this.employeesService.create(createDto);
  }

  // EXPORT CSV
  @Get('export/csv')
  async exportCsv(@Res() res: Response) {
    const employees = await this.employeesService.findAll();

    // Flatten the data structure for Excel/CSV format
    const flatData = employees.map((emp) => ({
      ID: emp.id,
      FirstName: emp.firstName,
      LastName: emp.lastName,
      Email: emp.email,
      Department: emp.department,
      Salary: emp.salary,
      // Handle nested objects safely 
      Street: emp.address?.street || '',
      City: emp.address?.city || '',
      ZipCode: emp.address?.zipCode || '',
      BankName: emp.bankDetails?.bankName || '',
      AccountNumber: emp.bankDetails?.accountNumber || '',
    }));

    const parser = new Parser();
    const csv = parser.parse(flatData);

    // Send the file to the user
    res.header('Content-Type', 'text/csv');
    res.attachment('employees_list.csv');
    return res.send(csv);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  // DOWNLOAD PDF 
  @Get(':id/pdf')
  async downloadPdf(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const employee = await this.employeesService.findOne(id);
    
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const doc = new PDFDocument();

    // Set headers to force download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=employee_${id}.pdf`,
    });

    doc.pipe(res);

    // PDF Content Design
    doc.fontSize(25).text('Employee Profile', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).text(`ID: ${employee.id}`);
    doc.text(`Name: ${employee.firstName} ${employee.lastName}`);
    doc.text(`Email: ${employee.email}`);
    doc.text(`Department: ${employee.department}`);
    doc.text(`Salary: ${employee.salary}`);
    doc.moveDown();

    // Address Section
    if (employee.address) {
      doc.fontSize(18).text('Address');
      doc.fontSize(14).text(`${employee.address.street}, ${employee.address.city} - ${employee.address.zipCode}`);
      doc.moveDown();
    }

    // Bank Details Section
    if (employee.bankDetails) {
      doc.fontSize(18).text('Bank Details');
      doc.fontSize(14).text(`Bank: ${employee.bankDetails.bankName}`);
      doc.text(`Account No: ${employee.bankDetails.accountNumber}`);
      doc.text(`IFSC: ${employee.bankDetails.ifscCode}`);
    }

    doc.end();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { 
    return this.employeesService.findOne(id);
  }

  @Patch(':id') 
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}