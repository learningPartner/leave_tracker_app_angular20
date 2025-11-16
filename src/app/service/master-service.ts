import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseModel, LoginModel } from '../models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  onLogin(obj: LoginModel) {
    return this.http.post<any>("https://api.freeprojectapi.com/api/LeaveTracker/login",obj)
  }

  getAllEmpl() {
    return this.http.get<any[]>('https://api.freeprojectapi.com/api/LeaveTracker/getAllEmployee')
  }

  onAddLeaveBalance(obj: any) {
    return this.http.post<any>("https://api.freeprojectapi.com/api/LeaveTracker/AddLeaveBalance",obj)
  }
  getAllLeave() {
    return this.http.get<any[]>("https://api.freeprojectapi.com/api/LeaveTracker/GetAllBalances")
  }
  
  getLeaveRequestsbyEmpId(id: number) {
    return this.http.get<any[]>("https://api.freeprojectapi.com/api/LeaveTracker/GetLeaveRequestsbyEmpId?empid="+id)
  }
 

   onAddLeaveRequest(obj: any) {
    return this.http.post<any>("https://api.freeprojectapi.com/api/LeaveTracker/request",obj)
  }
}
