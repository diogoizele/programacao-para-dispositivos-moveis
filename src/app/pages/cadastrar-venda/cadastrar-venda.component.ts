import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { VendasService } from '../../services/vendas.service';
import { EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-cadastrar-venda',
  templateUrl: './cadastrar-venda.component.html',
  styleUrls: ['./cadastrar-venda.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CadastrarVendaComponent implements OnInit {
  vendaForm: FormGroup;
  isEdit = false;
  venda: any = null;
  produtos: any[] = [];
  maxDate = new Date().toISOString().split('T')[0];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private vendaService: VendasService,
    private estoqueService: EstoqueService
  ) {
    const nav = this.router.getCurrentNavigation();
    const venda = nav?.extras.state?.['venda'];

    this.vendaForm = this.fb.group({
      produto: ['', Validators.required],
      cliente: ['', Validators.required],
      dataVenda: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
    });

    this.estoqueService.getAll().subscribe((produtos) => {
      console.log('Produtos recuperados:', produtos);

      this.venda = venda || null;
      this.isEdit = !!venda;

      if (venda) {
        console.log('Venda recebida:', venda);
        const produto = produtos.find((p) => p.nome === venda.produto);
        console.log('Produto encontrado para a venda:', produto);
        this.vendaForm.patchValue({
          ...venda,
          produto: produto?.id || '',
        });
      }
      this.produtos = produtos.map((p) => ({
        id: p.id,
        nome: p.nome,
        preco: p.preco,
      }));
    });

    this.vendaForm.get('produto')?.valueChanges.subscribe((produtoId) => {
      const produtoSelecionado = this.produtos.find((p) => p.id === produtoId);
      if (produtoSelecionado) {
        this.vendaForm.patchValue({ preco: produtoSelecionado.preco });
      } else {
        this.vendaForm.patchValue({ preco: 0 });
      }
    });
  }

  ngOnInit() {}

  private buscarProduto(id: string) {
    return this.produtos.find((p) => p.id === id);
  }

  salvarVenda() {
    if (this.vendaForm.invalid) {
      this.vendaForm.markAllAsTouched();
      return;
    }

    const vendaData = this.vendaForm.value;
    vendaData.produto = this.buscarProduto(vendaData.produto)?.nome || '';

    if (this.isEdit) {
      this.vendaService.update(this.venda.id, vendaData).subscribe({
        next: () => {
          console.log('Venda atualizada com sucesso');
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Erro ao atualizar venda:', error);
        },
      });
    } else {
      this.vendaService.save(vendaData).subscribe({
        next: () => {
          console.log('Venda cadastrada com sucesso');
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar venda:', error);
        },
      });
    }
  }
}
