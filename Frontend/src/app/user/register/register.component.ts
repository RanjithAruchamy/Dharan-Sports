import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Shared/User/user.service';
import { SportService } from '../../Shared/Sport/sport.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  showErrorMessage: String;

  constructor(
    public userService: UserService,
    public sportService:SportService,
    private http: HttpClient,
    private _renderer: Renderer2
    ) { }
    Sports: String;
    selected: null;

  ngOnInit(): void {
    this.sportService.getSports().subscribe(
      res => {
        this.Sports = res as String;
        console.log(this.Sports)
      })

      let script = this._renderer.createElement('script');
      script.defer = true;
      script.async = true;
      script.src = 'https://www.google.com/recaptcha/api.js';
      this._renderer.appendChild(document.body, script);
  }

  sportList(){
    return this.sportService.getSports().subscribe(
      res => {
        return this.Sports
      }
    )
  }

  onSubmit(form: NgForm){
 var response = grecaptcha.getResponse();
 if(!response)
 alert('Please enable reCaptcha')
 else{
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {

        if(err.status === 422)
        this.showErrorMessage = err.error.join('<br/>');
        else
        this.showErrorMessage = 'Something went wrong . Please contact admin';
      }
    );
 }
  }

  resetForm(form: NgForm){
    this.userService.selectedUser ={
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: ""
    };
    form.resetForm();
    this.showErrorMessage = '';
    grecaptcha.reset();
  }

  resolved(token){
    return this.userService.verifyToken(token)
  }
}
