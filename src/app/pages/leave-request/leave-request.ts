import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  imports: [FormsModule,DatePipe],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css'
})
export class LeaveRequest implements OnInit {


  newLeaveReqObj: any = {
    "leaveId": 0,
    "empId": 0,
    "leaveDate": new Date(),
    "fromDate": "",
    "toDate": "",
    "reason": "",
    "leaveType": ""
  }
  masyterSrv = inject(MasterService);
  leaveRequestList:any[]=[]

  constructor() {
    const localData = localStorage.getItem("leaveUser");
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.newLeaveReqObj.empId = parseObj.empId;
    }
  }

  ngOnInit(): void {
    this.loadLeaveRequestByEmp()
  }

  loadLeaveRequestByEmp() {
    this.masyterSrv.getLeaveRequestsbyEmpId(this.newLeaveReqObj.empId).subscribe({
      next:(result:any)=>{
        this.leaveRequestList =  result;
      }
    })
  }

  onSaveRequest() {
    this.masyterSrv.onAddLeaveRequest(this.newLeaveReqObj).subscribe({
      next:(result:any)=>{
        alert("Leaevr Request Rasied")
      },
      error:(error: any)=>{

      }
    })
  }
}
