import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

type Body = { email: string; password: string };

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: Body) {
    return this.http.post(`${this.apiUrl}/login`, {
      email: credentials.email,
      senha: credentials.password
    });
  }

  register(user: Body) {
    return this.http.post(`${this.apiUrl}/cadastro`, {
      email: user.email,
      senha: user.password
    });
  }
}
