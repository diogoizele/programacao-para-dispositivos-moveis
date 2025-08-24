import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component';
import { EstoqueService } from '../../services/estoque.service';
import { filter, Subscription } from 'rxjs';

type Item = {
  id?: string;
  nome: string;
  quantidade: number;
  preco: number;
  custo: number;
  fornecedor: string;
  marca: string;
  img: string;
};

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HeaderComponent,
    BottomBarComponent,
  ],
})
export class EstoqueComponent implements OnInit {
  produtos: Item[] = [];
  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private navController: NavController,
    private estoqueService: EstoqueService
  ) {}

  ngOnInit() {
    this.buscarProdutos();

    // toda vez que a rota mudar e for esta página, busca novamente
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/estoque') {
          this.buscarProdutos();
        }
      });
  }

  buscarProdutos() {
    this.estoqueService.getAll().subscribe({
      next: (response) => {
        console.log('Produtos carregados:', response);
        this.produtos = response;
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
      },
    });
  }

  cadastrarProduto() {
    this.navController.navigateForward('/cadastrar-estoque');
  }

  editarProduto(produto: Item) {
    console.log('Editar produto:', produto);
    this.navController.navigateForward(`/cadastrar-estoque`, {
      state: {
        produto,
      },
    });
  }

  removerProduto(produto: Item) {
    if (confirm(`Tem certeza que deseja remover o produto ${produto.nome}?`)) {
      this.estoqueService.delete(produto?.id!).subscribe({
        next: (response) => {
          console.log('Produto removido com sucesso:', response);
          this.produtos = this.produtos.filter((p) => p.id !== produto.id);
        },
        error: (error) => {
          console.error('Erro ao remover produto:', error);
        },
      });
    }
  }
}
