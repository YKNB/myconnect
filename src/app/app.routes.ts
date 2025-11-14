import { Routes } from '@angular/router';
import { AddressBookComponent } from './components/address-book/address-book';
import { ContactFormComponent } from './components/contact-form/contact-form';
import { LoginComponent } from './components/login';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'contacts',
    component: AddressBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: ContactFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: ContactFormComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];
