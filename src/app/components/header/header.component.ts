import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() mostrarBotaoVoltar: boolean = false;
  @Input() mostrarAvatar: boolean = true;
  @Input() customTitulo: boolean = false;

  constructor(private navController: NavController) {}

  ngOnInit() {}

  voltar() {
    this.navController.back();
  }
}
