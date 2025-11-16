import { Component, inject, OnInit } from '@angular/core';
import { ApiResponseModel, EmployeeModel } from '../../models/Employee.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit {

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  http = inject(HttpClient)


  ngOnInit(): void {
    this.getAllEMployee();
  }

  getAllEMployee() {
    this.http.get<EmployeeModel[]>("https://api.freeprojectapi.com/api/LeaveTracker/getAllEmployee").subscribe({
      next: (result: EmployeeModel[]) => {
        this.employeeList = result;
      },
      error: (error) => {

      }
    })
  }

  onSaveEmployee() {
    debugger;
    this.http.post<ApiResponseModel>("https://api.freeprojectapi.com/api/LeaveTracker/CreateNewEmployee", this.employeeObj).subscribe({
      next: (result: ApiResponseModel) => {
        debugger;
        alert(result.message);
        this.getAllEMployee();
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message)
      }
    })
  }

  onEdit(obj: EmployeeModel) {
    this.employeeObj = obj;
  }
  onUpdateEmployee() {
    debugger;
    this.http.put<ApiResponseModel>("https://api.freeprojectapi.com/api/LeaveTracker/UpdateEmployee?id=" + this.employeeObj.empId, this.employeeObj).subscribe({
      next: (result: ApiResponseModel) => {
        debugger;
        alert(result.message);
        this.getAllEMployee();
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message)
      }
    })
  }

  onDeletEmployee(id: number) {
    debugger;
    const isConfirm = confirm("Are you sure want to Delete");
    if (isConfirm) {
      this.http.delete<ApiResponseModel>("https://api.freeprojectapi.com/api/LeaveTracker/DeleteEmployee?id=" + id).subscribe({
        next: (result: ApiResponseModel) => {
          debugger;
          alert(result.message);
          this.getAllEMployee();
        },
        error: (error: any) => {
          debugger;
          alert(error.error.message)
        }
      })
    }

  }
}


