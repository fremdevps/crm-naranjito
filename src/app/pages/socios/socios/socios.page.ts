import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.page.html',
  styleUrls: ['./socios.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SociosPage implements OnInit {

  constructor() { }

  ngOnInit() {
    null;
  }

}
