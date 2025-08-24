import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component';
import { VendasService } from '../../services/vendas.service';
import { Subscription } from 'rxjs';

type Item = {
  id?: string;
  produto: string;
  cliente: string;
  dataVenda: string;
  preco: number;
};

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HeaderComponent,
    BottomBarComponent,
  ],
})
export class HomeComponent {
  private routerSub!: Subscription;

  userName = 'Usuário';

  filter: 'recent' | 'high' | 'low' = 'recent';
  sales: Item[] = [];

  constructor(
    private router: Router,
    private navController: NavController,
    private vendasService: VendasService
  ) {
    this.routerSub = this.router.events.subscribe(() => {
      this.buscarVendas();
    });
  }

  setFilter(f: 'recent' | 'high' | 'low') {
    this.filter = f;
  }

  private buscarVendas() {
    this.vendasService.getAll().subscribe({
      next: (response) => {
        this.sales = response;
      },
      error: (error) => {
        console.error('Erro ao buscar vendas:', error);
      },
    });
  }

  get displayedSales(): Item[] {
    const arr = [...this.sales];
    if (this.filter === 'recent')
      arr.sort((a, b) => +new Date(b.dataVenda) - +new Date(a.dataVenda));
    if (this.filter === 'high') arr.sort((a, b) => b.preco - a.preco);
    if (this.filter === 'low') arr.sort((a, b) => a.preco - b.preco);
    return arr.slice(0, 10);
  }

  cadastrarVenda() {
    this.router.navigate(['cadastrar-venda']);
  }

  editarVenda(venda: Item) {
    this.navController.navigateForward(`/cadastrar-venda`, {
      state: {
        venda,
      },
    });
  }
  removerVenda(venda: Item) {
    if (confirm('Tem certeza que deseja remover esta venda?')) {
      console.log('Removendo venda:', venda);
      if (venda.id) {
        this.vendasService.delete(venda.id).subscribe({
          next: () => {
            console.log('Venda removida com sucesso');
            this.buscarVendas();
          },
          error: (error) => {
            console.error('Erro ao remover venda:', error);
            alert('Erro ao remover venda. Tente novamente.');
          },
        });
      }
    }
  }
}
