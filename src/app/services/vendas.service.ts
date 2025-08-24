import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

type Item = {
  id?: string;
  produto: string;
  cliente: string;
  dataVenda: string;
  preco: number;
};

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  private apiUrl = `${environment.apiUrl}/vendas`;

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
