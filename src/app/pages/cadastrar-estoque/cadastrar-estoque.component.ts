import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-cadastrar-estoque',
  templateUrl: './cadastrar-estoque.component.html',
  styleUrls: ['./cadastrar-estoque.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, HeaderComponent],
})
export class CadastrarEstoqueComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.verificarHistorico();
  }

  verificarHistorico() {
    console.log(this.router.getCurrentNavigation());
  }
}
