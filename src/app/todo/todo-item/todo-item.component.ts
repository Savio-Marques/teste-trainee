import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService) {}

    // 1. Crie um novo EventEmitter para a edição. Ele enviará o objeto 'Todo' inteiro.
  @Output() editRequest: EventEmitter<Todo> = new EventEmitter<Todo>();

  // Não precisamos mais injetar o TodoService aqui, o pai cuidará das ações.

  // 2. Crie o método que será chamado pelo botão "Editar"
  onEdit(): void {
    // 3. Emita o evento com os dados da tarefa atual
    this.editRequest.emit(this.todo);
  }

  deleteTodo(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoService.deleteTodo(this.todo.id);
    }
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }
}
