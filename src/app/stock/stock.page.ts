import { Component } from '@angular/core';
import { IonTitle, IonContent } from '@ionic/angular/standalone';

import { TopBarComponent } from '../components/top-bar/top-bar.component';

@Component({
  selector: 'app-stock',
  templateUrl: 'stock.page.html',
  styleUrls: ['stock.page.scss'],
  imports: [IonTitle, IonContent, TopBarComponent],
})
export class StockPage {
  constructor() {}
}
