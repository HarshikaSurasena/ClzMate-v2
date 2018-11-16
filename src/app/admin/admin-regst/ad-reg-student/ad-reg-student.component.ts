import { userRegister } from '../../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Subject } from 'rxjs';
import { clzService } from '../../../services/clz.service';

@Component({
  selector: 'app-ad-reg-student',
  templateUrl: './ad-reg-student.component.html',
  styleUrls: ['./ad-reg-student.component.scss'],
  providers: [clzService]
})
export class AdRegStudentComponent implements OnInit {

  form1;
  classes: any[] = [];

  constructor(
    private fb1: FormBuilder,
    private register: userRegister,
    private getClzes: clzService
  ){ 
    this.form1 = this.fb1.group({
      fullName: ['',  Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required], 
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [
        Validators.email,
        Validators.required
      ]], 
      school: ['', Validators.required],
      mobileNumber: ['',Validators.required],
      landNumber: [''],
      firstLine: ['', Validators.required],
      secondLine: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      batch:[''],
      clzes: new FormArray([]),
      fatherName: ['', Validators.required],
      dadNumber: ['', Validators.required],
      motherName: ['', Validators.required],
      momNumber: ['', Validators.required],
      gardianName: [''],
      gardianNumber: ['']
    })
  }
 
  ngOnInit() {
    this.getAllClzes()
  }

  getAllClzes(){
    this.getClzes.getAllClzes()
      .subscribe(result => {
        this.classes = result.json().Clz;
        // console.log(this.classes);
        if(result.json()) console.log(result.json());
      })
  }

  onSubmit(form1){
    form1.value['role'] = "student";
    form1.value['password'] = "password";
    console.log(form1.value);
    this.register.register(form1.value)
      .subscribe(result => {
        if(result.json().state) alert("Student registered successfully");
        else if(result.json().exist) alert("Student already exist"); 
        else alert("Error occured please register student again");
        console.log(result);
      })
    this.form1.reset();
  }

  get email(){return this.form1.get('email');}

  get fullName(){return this.form1.get('fullName');}

  get firstName(){return this.form1.get('firstName');}

  get lastName(){return this.form1.get('lastName');}

  get birthday(){return this.form1.get('birthday');}

  get gender(){return this.form1.get('gender');}

  get school(){return this.form1.get('school');}

  get mobileNumber(){return this.form1.get('mobileNumber');}

  get firstLine(){return this.form1.get('firstLine');}

  get secondLine(){return this.form1.get('secondLine');}

  get city(){return this.form1.get('city');}

  get district(){return this.form1.get('district');}

  get batch(){return this.form1.get('batch');}

  get fatherName(){return this.form1.get('fatherName');}

  get dadNumber(){return this.form1.get('dadNumber');}

  get motherName(){return this.form1.get('motherName');}

  get momNumber(){return this.form1.get('momNumber');}

  get clzes(){return this.form1.get('clzes')}

  addClz(clz){
    // console.log(clz);
    // this.clzes.push(clz);
    this.clzes.push(new FormControl(clz.value));
    // this.topics.push(clz.value);
    // this.clzes[this.clzes.length] = "ssdf";
    console.log(clz.value);
    // console.log(this.classes);
    // clz._id = ''; 
  }

  removeClz(topic:FormControl){
    this.clzes.removeAt(this.clzes.controls.indexOf(topic));
    // this.topics = this.topics.filter(item => item !== topic);
    console.log(topic);
  }
}
