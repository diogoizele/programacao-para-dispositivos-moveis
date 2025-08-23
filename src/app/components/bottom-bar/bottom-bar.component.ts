import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class BottomBarComponent implements OnInit {
  @Input() componenteAtivo: string = '';

  constructor(private navController: NavController) {}

  ngOnInit() {}

  icones = [
    { nome: 'vendas', rota: '/home', icon: 'cash-outline' },
    { nome: 'estoque', rota: '/estoque', icon: 'home-outline' },
    { nome: 'perfil', rota: '/perfil', icon: 'person-outline' },
  ];

  isActive(rota: string) {
    return `/${this.componenteAtivo}` === `${rota}`;
  }

  navigate(path: string) {
    this.navController.navigateForward(path);
  }
}
