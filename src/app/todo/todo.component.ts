import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);

    this.loadTodos();
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
    this.loadTodos();
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
    this.loadTodos();
  }

  clearAll() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    if(confirm("Deseja realmente apagar as tarefas completas?")){
          this.todoService.clearCompletedTasks();
    }
    this.loadTodos();
  }

  get displayedTodos(): Todo[] {
    if (this.showCompletedTasks) {
      return this.todos;
    }
    return this.todos.filter(todo => !todo.completed);
  }

  toggleCompletedTasksView(): void {
    this.showCompletedTasks = !this.showCompletedTasks;
  }

  get labelClearAll(){
    return 'Limpar Todos'
  }

    exportToPdf(): void {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const margin = 15;
    const lineHeight = 8;
    let currentY = margin;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const today = new Date().toLocaleDateString('pt-BR');

    doc.setFontSize(20);
    doc.text('Lista de Tarefas', pageWidth / 2, currentY, { align: 'center' });
    currentY += lineHeight * 2;

    this.displayedTodos.forEach(todo => {
      if (currentY > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }

      const status = todo.completed ? '[x]' : '[ ]';
      const taskText = `${status} ${todo.title}`;

      doc.setFontSize(12);
      doc.text(taskText, margin, currentY);
      
      currentY += lineHeight;
    });
    
    doc.setFontSize(8);
    doc.text(`Exportado em: ${today}`, margin, pageHeight - 10);

    doc.save('lista-de-tarefas.pdf');
  }
}
