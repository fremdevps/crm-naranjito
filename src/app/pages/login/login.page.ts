import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonImg, IonCardHeader, IonItem, IonCardContent, IonText, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { LoginParams } from 'src/models/auth.model';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonCardTitle, IonText, IonCardContent, IonItem, IonCardHeader, IonImg, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  authService = inject(AuthService);
  alertController = inject(AlertController);
  fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor() { }


  ngOnInit() {
    null;
  }

  onSubmit() {

    this.authService.login(this.loginForm.value as LoginParams).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.alertController.create({
          header: 'Error',
          message: err.error.message,
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    })
  }

  get controls() {
    return this.loginForm.controls;
  }
}
