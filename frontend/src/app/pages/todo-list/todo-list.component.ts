import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  standalone: true,
  providers: [ConfirmationService],
  imports: [
    CommonModule, 
    DialogModule, 
    ConfirmDialogModule, 
    FormsModule,
    ButtonModule, 
    InputTextModule,
    PopoverModule,
  ]
})
export class TodoListComponent implements OnInit {
  
  // props de dados
  todos: Todo[] = [];
  dones: Todo[] = [];
  
  // props de controle de UI
  editDialogVisible: boolean = false;
  createDialogVisible: boolean = false;
  isSidebarOpen: boolean = false;
  
  // props de estado
  selectedTodo: Todo = { id: 0, title: '', completed: false }; 
  newTodoTitle: string = '';
  popoverTodo: Todo | null = null; 
  hovered: { [key: number]: boolean } = {};

  constructor(
    private todoService: TodoService, 
    private confirmationService: ConfirmationService
  ) {}

  // inicializa
  ngOnInit(): void {
    this.loadTodos();
  }

  // carrega todos e faz filtro de done e todo
  loadTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data.filter(todo => !todo.completed);
      this.dones = data.filter(todo => todo.completed);
    });
  }

  // done
  markAsDone(todo: Todo): void {
    const updated = { ...todo, completed: true };
    this.todoService.updateTodo(updated).subscribe(() => this.loadTodos());
  }

  // undone
  markAsUndone(todo: Todo): void {
    const updated = { ...todo, completed: false };
    this.todoService.updateTodo(updated).subscribe(() => this.loadTodos());
  }

  // dialog pra criar todo
  openCreateDialog(): void {
    this.newTodoTitle = '';
    this.createDialogVisible = true;
  }

  // criar todo
  createTodo(): void {
    const newTodo: Partial<Todo> = {
      title: this.newTodoTitle.trim(),
      completed: false
    };

    this.todoService.createTodo(newTodo).subscribe(() => {
      this.createDialogVisible = false;
      this.newTodoTitle = '';
      this.loadTodos();
    });
  }

  // dialog de edição de todo
  openEditDialog(todo: Todo): void {
    this.selectedTodo = { ...todo };
    this.editDialogVisible = true;
  }

  // salva edição
  saveTodo(): void {
    this.todoService.updateTodo(this.selectedTodo).subscribe(() => {
      this.editDialogVisible = false;
      this.loadTodos();
    });
  }

  // confirm dialog pra deletar
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir esta tarefa?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTodo(id);
      }
    });
  }

  // deleta 
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  // mostra popover apenas no todo que está em hover
  togglePopover(event: Event, todo: Todo, popover: any): void {
    this.popoverTodo = todo;
    popover.toggle(event);
  }

  // mostra a sidebar no mobile
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}