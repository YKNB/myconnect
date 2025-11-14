import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithRedirect, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  user$ = user(this.auth);

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }
}
