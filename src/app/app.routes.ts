import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { CadastrarEstoqueComponent } from './pages/cadastrar-estoque/cadastrar-estoque.component';
import { CadastrarVendaComponent } from './pages/cadastrar-venda/cadastrar-venda.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'estoque',
    component: EstoqueComponent,
  },
  {
    path: 'cadastrar-estoque',
    component: CadastrarEstoqueComponent,
  },
  {
    path: 'cadastrar-venda',
    component: CadastrarVendaComponent,
  },
  { path: 'perfil', component: PerfilComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // rota default
  { path: '**', redirectTo: 'home' },
];
