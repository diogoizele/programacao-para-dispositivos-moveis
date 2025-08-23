import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HeaderComponent,
    BottomBarComponent,
  ],
})
export class PerfilComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  sair() {
    this.router.navigate(['/login'], { replaceUrl: true });
    history.pushState(null, '', '/login');
  }
}
