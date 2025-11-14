
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithRedirect, signOut, User, signInWithEmailAndPassword } from '@angular/fire/auth';
import { EMPTY, from, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  public currentUser = signal<User | null>(null);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.set(user);
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithRedirect(this.auth, provider)).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  loginWithEmail(email:string,password:string): Observable<User | null> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((result) => {
        this.router.navigate(['/']);
        return of(result.user);
      }),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      switchMap(() => {
        this.router.navigate(['/login']);
        return of(undefined);
      }),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
