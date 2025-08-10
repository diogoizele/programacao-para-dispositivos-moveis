import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SafeArea } from 'capacitor-plugin-safe-area';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      SafeArea.getSafeAreaInsets().then(({ insets }) => {
        document.body.style.setProperty(
          '--safe-area-inset-top',
          insets.top + 'px'
        );
        document.body.style.setProperty(
          '--safe-area-inset-bottom',
          insets.bottom + 'px'
        );
        document.body.style.setProperty(
          '--safe-area-inset-left',
          insets.left + 'px'
        );
        document.body.style.setProperty(
          '--safe-area-inset-right',
          insets.right + 'px'
        );
      });
    });
  }
}
