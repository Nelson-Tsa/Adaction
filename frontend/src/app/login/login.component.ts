import { Component, inject, OnDestroy } from '@angular/core';
import { Credentials, LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubcription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  invalidCredentials = false;

  login() {
    this.loginSubcription = this.loginService
      .login(this.loginFormGroup.value as Credentials)
      .subscribe({
        next: (result: User | null | undefined) => {
          this.navigateDashboard();
        },
        error: (error) => {
          this.invalidCredentials = true;
        },
      });
  }

  navigateDashboard() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.loginSubcription?.unsubscribe();
  }
}
