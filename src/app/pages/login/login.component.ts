import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; 

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

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      alert('✅ Login realizado com sucesso!');
    } else {
      alert('❌ Usuário ou senha incorretos.');
    }
  }
}
