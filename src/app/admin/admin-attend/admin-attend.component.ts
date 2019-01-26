import { Component, OnInit } from '@angular/core';
import { Http, CookieXSRFStrategy } from '@angular/http';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { UserService } from '../../services/users.service';
import { AttendanceService } from '../../services/attendance.service';
import { ClzService } from 'src/app/services/clz.service';

formatDate(new Date(), 'yyyy/MM/dd', 'en');

@Component({
  selector: 'app-admin-attend',
  templateUrl: './admin-attend.component.html',
  styleUrls: ['./admin-attend.component.scss'],
  providers: [UserService, AttendanceService, ClzService]
})
export class AdminAttendComponent implements OnInit {

  defaultYear = "Year";
  defaultMonth = "Month";
  // defaultClzId = "Class Id";
  selectedClz: ['']
  form7;
  show: boolean = false;
  studentAttendance: any[] = [];
  clzes: any[] = [];
  currentYear: Date

  constructor(
    private fb7: FormBuilder,
    private http: Http,
    private User: UserService,
    private Attendances: AttendanceService,
    private Clzes: ClzService
  ) {
    this.getAllClzes()
    this.form7 = this.fb7.group({
      year: [''],
      month: [''],
      clzId: ['']
    })
  }

  ngOnInit() {
  }

  onSubmit(form7){
    if(!form7.value.month){
      form7.value.month = "All"
    }
    form7.value['clzId'] = this.selectedClz;
    //console.log(form7.value);
    this.Attendances.getClzAttendance(form7.value.year, form7.value.month, form7.value.clzId)
      .subscribe(responce => {
        this.studentAttendance = responce.json().Attendance;
        this.show = true;
        //console.log(this.studentAttendance[0].student);
      })
  }

  getAllClzes(){
    this.Clzes.getAllClzes()
      .subscribe(response => {
        this.clzes = response.json().Clz;
        //console.log(this.clzes);
      })
  }

  getAllAttendance() {
    this.Attendances.getAllAttendance()
      .subscribe(response => {
        this.studentAttendance = response.json().Attendance;
        //console.log(this.studentAttendance);
        // console.log(Object.values(response.json().Attendance));
      });
  }

  getClzAttendance(year, month, clzId){
    this.Attendances.getClzAttendance(year, month, clzId)
      .subscribe(response => {
        this.studentAttendance = response.json().Attendance;
        //console.log(this.studentAttendance);
      })
  }

  addClz(event){
    console.log(event.target.value)
    var clz = event.target.value;
    this.selectedClz = clz;
    // console.log(this.selectedClz);
    const noOfClzes = this.clzes.length;
    clz = '';
    for(var i=0; i<noOfClzes; i++){
      if(this.clzes[i].clzNo == this.selectedClz){
        this.selectedClz = this.clzes[i]._id;
        //console.log(this.selectedClz);
      }
    }
  }

  get year(){ return this.form7.get('year'); }

  get month(){ return this.form7.get('month'); }

  get clzId(){ return this.form7.get('clzId'); }
  
}

// function method($scope){
//   $scope.date = new Date();
// }