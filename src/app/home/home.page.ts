import { Component } from '@angular/core';
import { IonTitle, IonContent } from '@ionic/angular/standalone';

import { TopBarComponent } from '../components/top-bar/top-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTitle, IonContent, TopBarComponent],
})
export class HomePage {
  constructor() {}
}
