import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true,
  selector: 'app-todo-overview',
  imports: [CommonModule], 
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.css']
})
export class TodoOverview {
    
isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
