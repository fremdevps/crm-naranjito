import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonCardContent, IonHeader, IonButton, IonCard, IonImg, IonCardHeader, IonCardTitle, IonInput, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, logIn, people } from 'ionicons/icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonText, IonInput, IonCardTitle, IonCardHeader, IonImg, IonCard, IonButton, IonHeader, IonCardContent, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Socios', url: '/socios', icon: 'people' },
    { title: 'Login', url: '/login', icon: 'log-in' },
  ];
  public labels = [];
  public userName = '';
  authService = inject(AuthService);
  constructor() {
    addIcons({ home, logIn, people });
    this.authService.getUserName().subscribe((name) => {
      this.userName = name || '';
    }
    );
  }
}
