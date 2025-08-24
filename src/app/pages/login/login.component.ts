import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AutenticacaoService
  ) {}

  login() {
    if (!this.username || !this.password) {
      alert('❌ Por favor, preencha todos os campos.');
      return;
    }

    if (this.username === 'admin' && this.password === '1234') {
      alert('✅ Login realizado com sucesso!');
      this.router.navigateByUrl('/home');
      return;
    }

    console.log({ email: this.username, senha: this.password });

    this.authService
      .login({ email: this.username, password: this.password })
      .subscribe({
        complete: () => {
          console.log('Login completo');
        },
        next: (response) => {
          console.log('response');
          alert('✅ Login realizado com sucesso!');
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          alert('❌ Usuário ou senha incorretos.');
        },
      });
  }
}
