import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component';

type Sale = { id: number; product: string; client: string; date: string; amount: number };

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, IonicModule, RouterModule, HeaderComponent, BottomBarComponent],
})
export class HomeComponent {
  userName = 'Usuário';

  filter: 'recent' | 'high' | 'low' = 'recent';
  sales: Sale[] = [];

  constructor() {
    const raw = localStorage.getItem('sales');
    this.sales = raw
      ? JSON.parse(raw)
      : [
          { id: 1, product: 'Nome Produto', client: 'Nome Cliente', date: '2025-12-12', amount: 345 },
          { id: 2, product: 'Nome Produto', client: 'Nome Cliente', date: '2025-05-15', amount: 234 },
        ];
  }

  setFilter(f: 'recent' | 'high' | 'low') {
    this.filter = f;
  }

  get displayedSales(): Sale[] {
    const arr = [...this.sales];
    if (this.filter === 'recent') arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (this.filter === 'high') arr.sort((a, b) => b.amount - a.amount);
    if (this.filter === 'low') arr.sort((a, b) => a.amount - b.amount);
    return arr.slice(0, 10);
  }
}
