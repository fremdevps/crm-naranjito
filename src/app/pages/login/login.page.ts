import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonImg, IonCardHeader, IonItem, IonCardContent, IonText, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonText, IonCardContent, IonItem, IonCardHeader, IonImg, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  constructor(private fb: FormBuilder) { }
  loginForm = this.fb.nonNullable.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    null;
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  get controls() {
    return this.loginForm.controls;
  }
}
