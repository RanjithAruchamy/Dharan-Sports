import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User ={

    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: ""
  }
  constructor(private http: HttpClient) { }

  postUser(user: User){
    const payload = {
      firstName:user.firstName,
      lastName:user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password
    };
    console.log('Entered to route'+payload)
    return this.http.post(environment.apiBaseUrl+'/register/user', payload)
  }
}
