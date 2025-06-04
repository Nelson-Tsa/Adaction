import { Component, inject, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
})
export class RegisterComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private registerSubscription: Subscription | null = null;

  registerFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registrationFailed = false;
  errorMessage = '';

  register() {
    if (this.registerFormGroup.invalid) {
      return;
    }
    this.registrationFailed = false;
    this.registerSubscription = this.loginService
      .register(this.registerFormGroup.value)
      .subscribe({
        next: (user: User | null | undefined) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.registrationFailed = true;
          console.error('Erreur d\'inscription:', err);
          if (typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = "Erreur lors de l'inscription. Veuillez vérifier vos informations.";
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
}
