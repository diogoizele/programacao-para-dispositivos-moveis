import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

type Item = {
  id?: string;
  nome: string;
  quantidade: number;
  preco: number;
  custo: number;
  fornecedor: string;
  marca: string;
  img: string;
};

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private apiUrl = `${environment.apiUrl}/estoque`;

  constructor(private http: HttpClient) {}

  save(item: Item) {
    return this.http.post(`${this.apiUrl}`, item);
  }

  getAll() {
    return this.http.get<Item[]>(`${this.apiUrl}`);
  }

  update(id: string, item: Item) {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
