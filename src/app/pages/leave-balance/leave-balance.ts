import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leave-balance',
  imports: [FormsModule,DatePipe,AsyncPipe],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.css'
})
export class LeaveBalance  implements OnInit {
  newLeaveObj: any = {
    "balanceId": 0,
    "empId": 0,
    "updatedDate":  new Date(),
    "count": 0,
    "updateBy": 0,
    "leaveType": ""
  }
  @ViewChild("fomrModal") formModalViewchild!: ElementRef;
  masterSrv= inject(MasterService);
  leaveBalanceList: any[]=[];
  allEmpList$ :Observable<any[]> = new Observable<any[]>;

  constructor() {
    this.allEmpList$ =  this.masterSrv.getAllEmpl();
    const localData =  localStorage.getItem("leaveUser");
    if(localData != null) {
      const parseObj = JSON.parse(localData);
      this.newLeaveObj.updateBy = parseObj.empId;
    }
  }


  ngOnInit(): void {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.masterSrv.getAllLeave().subscribe({
      next:(result: any[])=>{
        this.leaveBalanceList =  result;
      }
    })
  }

  onSaveBalance() {
    this.masterSrv.onAddLeaveBalance(this.newLeaveObj).subscribe({
      next:(result:any)=>{
        alert("Leave Balance Updated");
        this.getAllLeaves();
      },
      error:(error: any)=>{
        alert()
      }
    })
  }

  openModal() {
    if(this.formModalViewchild) {
      this.formModalViewchild.nativeElement.style.display = "block";
    }
  }

  closeModal() {
    if(this.formModalViewchild) {
      this.formModalViewchild.nativeElement.style.display = "none";
    }
  }
}
