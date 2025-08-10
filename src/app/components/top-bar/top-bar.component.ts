import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  imports: [IonHeader, IonToolbar],
})
export class TopBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
