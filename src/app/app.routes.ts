import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./pages/todo-list/todo-list.component').then(m => m.TodoListComponent)
  },
  {
    path: 'todos/new',
    loadComponent: () =>
      import('./pages/todo-form/todo-form.component').then(m => m.TodoFormComponent)
  },
  {
    path: 'todos/:id/edit',
    loadComponent: () =>
      import('./pages/todo-form/todo-form.component').then(m => m.TodoFormComponent)
  }
];
