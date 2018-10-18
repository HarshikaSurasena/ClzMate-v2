import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form;
  invalidLogin = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { 
    this.form = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {

  }

  onSubmit(form){
    this.auth.login(form.value).subscribe(result => {
      let token = result.json().JWT_Token; 
      let decodeJWT = this.getDecodedAccessToken(token)
      console.log(decodeJWT)
      console.log(token);
      if(token){
        localStorage.setItem('token', token);
        this.router.navigate(['admin/dashboard']);
      }else{
        this.invalidLogin = true;
        this.form.reset();
      }
    });
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  get email(){return this.form.get('email');}
  get password(){return this.form.get('password');}

}
