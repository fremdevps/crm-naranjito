import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonImg, IonCardHeader, IonItem, IonCardContent, IonText, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { LoginParams } from 'src/models/auth.model';
import { AlertController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonCardTitle, IonText, IonCardContent, IonItem, IonCardHeader, IonImg, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor() { }


  ngOnInit() {
    null;
  }

  async onSubmit() {
    //add log in logic here
    const loading = await this.notificationService.presentLoading('Iniciano sesión...');
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value as LoginParams).subscribe({
      next: (res) => {
        console.log(res);
        loading.dismiss();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        loading.dismiss();
        this.notificationService.presentAlert('Error', err.error.error_message);
      }
    });
  }

  get controls() {
    return this.loginForm.controls;
  }
}
