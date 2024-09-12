import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonImg, IonCardHeader, IonItem, IonCardContent, IonText, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { LoginParams } from 'src/models/auth.model';
import { AlertController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonCardTitle, IonText, IonCardContent, IonItem, IonCardHeader, IonImg, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  /*authService = inject(AuthService);
  notificationService = inject(NotificationService);*/
  fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private authService: AuthService, private notificationService: NotificationService,
    private alertCtrl: AlertController
  ) { }


  ngOnInit() {
    null;
  }

  async onSubmit() {
    //add log in logic here
    //const loading = await this.notificationService.presentLoading();
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value as LoginParams).subscribe({
      next: (res) => {
        console.log(res);
        this.alertCtrl.create({
          header: 'Success',
          message: 'You have successfully logged in',
          buttons: ['OK']
        }).then((alert) => {
          alert.present();
        });
      },
      error: (err) => {

        this.notificationService.presentAlert('Error', 'Invalid credentials');
      }
    });
  }

  get controls() {
    return this.loginForm.controls;
  }
}
