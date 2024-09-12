import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.page.html',
  styleUrls: ['./socios.page.scss'],
  standalone: true,
  imports: [IonButtons, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class SociosPage implements OnInit {

  constructor() { }

  ngOnInit() {
    null;
  }

}
