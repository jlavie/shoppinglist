import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginCredentials } from './login.utils';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private loginSubscription: Subscription | null = null;
  private route = inject(ActivatedRoute);

  formGroup = this.fb.group({
    email: ['',[Validators.required]],
    username: ['',[Validators.required]],
    password: ['',[Validators.required]],
  })
  routePath = this.route.snapshot.routeConfig?.path;

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }

  login() {
    this.loginSubscription = this.loginService.login(
      this.formGroup.value as LoginCredentials
    ).subscribe({
      next: result => {
        this.loginService.saveToken(result.token);
        this.navigateHome()
      }
    })
  }

  register() {
    this.loginSubscription = this.loginService.register(
      this.formGroup.value as User
    ).subscribe({
      next: result => {
        this.loginService.saveToken(result.token);
        this.navigateHome()
      }
    })
  }

  navigateHome() {
    this.router.navigate(['dish']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
