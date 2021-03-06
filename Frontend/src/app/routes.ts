import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

export const appRoutes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: RegisterComponent}]
  },
  {
    path: '', redirectTo:'/signup', pathMatch: 'full'
  },
  {
    path:'login', component: UserComponent,
    children:[{path:'', component:LoginComponent}]
  }
];
