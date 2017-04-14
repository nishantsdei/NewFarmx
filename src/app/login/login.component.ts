import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  private user = {
    grant_type:'password',
    client_id: '5x7EuN09HAeBn2pYJnvvq7szgJaULh14' //'h8EUskXhINLLg28yIkf73FpX4fm4aqCY'
  };
  private error = {};
  public valid_email = true;
  constructor(private router : Router,private loginService: LoginService) { }

  ngOnInit() {
  }

    checkemail(email) {
       let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       this.valid_email=regex.test(email);
    }
  
  	login(){
  		console.log("login",this.user)
		this.error = {};
		this.loginService.login(this.user)
                       .subscribe(
                           res => {
                             console.log("response",res)
                             localStorage.setItem("user",JSON.stringify(res));
                             this.router.navigate(['/dashboard']);
                           },
                            err => {
                            	console.log("error",err);
                                this.error = JSON.parse(err._body);
                            });
	}
}
