import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Shared/user.service';
import { environment } from '../../../environments/environment';
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
  constructor(public userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form.value)
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
  }

}
