import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

type User = { nome: string; email: string; senha: string };

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  constructor(private router: Router, private alertCtrl: AlertController) {}

  private getUsers(): User[] {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      return [];
    }
  }

  private setUsers(list: User[]) {
    localStorage.setItem('users', JSON.stringify(list));
  }

  async criarConta() {
    // validações simples
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      return this.showAlert('Preencha todos os campos.');
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email)) {
      return this.showAlert('Informe um e-mail válido.');
    }
    if (this.senha.length < 6) {
      return this.showAlert('A senha deve ter pelo menos 6 caracteres.');
    }
    if (this.senha !== this.confirmarSenha) {
      return this.showAlert('As senhas não conferem.');
    }

    const users = this.getUsers();
    if (users.some((u) => u.email.toLowerCase() === this.email.toLowerCase())) {
      return this.showAlert('Já existe uma conta com esse e-mail.');
    }

    users.push({ nome: this.nome, email: this.email, senha: this.senha });
    this.setUsers(users);

    await this.showAlert('Conta criada com sucesso! Faça login para continuar.');
    this.router.navigateByUrl('/', { replaceUrl: true }); // volta para o login
  }

  voltar() {
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  private async showAlert(message: string) {
    const a = await this.alertCtrl.create({ header: 'Atenção', message, buttons: ['OK'] });
    await a.present();
  }
}

