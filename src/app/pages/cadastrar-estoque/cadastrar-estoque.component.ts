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
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { HeaderComponent } from '../../components/header/header.component';
import { EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-cadastrar-estoque',
  templateUrl: './cadastrar-estoque.component.html',
  styleUrls: ['./cadastrar-estoque.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CadastrarEstoqueComponent implements OnInit {
  produtoForm: FormGroup;
  img: string | null = null;
  isEdit = false;
  produto: any = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private estoqueService: EstoqueService
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      custo: [0, [Validators.required, Validators.min(0)]],
      fornecedor: ['', Validators.required],
      marca: ['', Validators.required],
    });
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const produto = nav?.extras.state?.['produto'];

    this.produto = produto || null;
    this.isEdit = !!produto;

    if (produto) {
      this.produtoForm.patchValue(produto);
      this.img = produto.img || null;
    }
  }

  async tirarFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });
      this.img = foto.dataUrl || null;
    } catch (err) {
      console.error('Erro ao tirar foto', err);
    }
  }

  salvarProduto() {
    if (this.produtoForm.valid) {
      const produto = { ...this.produtoForm.value, img: this.img };
      if (this.isEdit) {
        this.estoqueService.update(this.produto.id, produto).subscribe({
          next: (response) => {
            this.router.navigate(['/estoque']);
          },
          error: (error) => {
            console.error('Erro ao editar produto:', error);
          },
        });
      } else {
        this.estoqueService.save(produto).subscribe({
          next: (response) => {
            this.router.navigate(['/estoque']);
          },
          error: (error) => {
            console.error('Erro ao salvar produto:', error);
          },
        });
      }
    }
  }
}
