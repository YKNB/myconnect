import { Routes } from '@angular/router';
import { AddressBookComponent } from './components/address-book/address-book';
import { ContactFormComponent } from './components/contact-form/contact-form';
import { LoginComponent } from './components/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  { path: '', component: AddressBookComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'add', component: ContactFormComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'edit/:id', component: ContactFormComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'login', component: LoginComponent },
];
