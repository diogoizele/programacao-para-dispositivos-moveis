import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component';

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
  constructor(private navController: NavController) {}

  ngOnInit() {}

  cadastrarProduto() {
    this.navController.navigateForward('/cadastrar-estoque');
  }
}
