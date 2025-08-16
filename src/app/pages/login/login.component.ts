import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      alert('✅ Login realizado com sucesso!');
    } else {
      alert('❌ Usuário ou senha incorretos.');
    }
  }
}
