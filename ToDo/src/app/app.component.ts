import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo';
  filter: 'all' | 'active' | 'done' | 'expired' = 'all';
  allItems: Item[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(
      todos => {
        this.allItems = todos;
        this.checkExpiredItems();
      },
      error => {
        console.error('Hiba a ToDok lekérésekor:', error);
      }
    );
  }

  addItem(description: string, expiryDateString: string) {
    if (!description || !expiryDateString) {
      console.error('Mindkét mezőt ki kell tölteni.');
      return;
    }
    const expiryDate = new Date(expiryDateString);
    if (isNaN(expiryDate.getTime())) {
      console.error('Érvénytelen dátum.');
      return;
    }
    const newTodo: Partial<Item> = {
      description,
      done: false,
      expiryDate
    };
    this.todoService.addTodo(newTodo).subscribe(
      todo => {
        this.allItems.unshift(todo);
      },
      error => {
        console.error('Hiba a Todo hozzáadásakor:', error);
      }
    );
  }

  remove(item: Item) {
    this.todoService.deleteTodo(item.id).subscribe(
      () => {
        const index = this.allItems.indexOf(item);
        this.allItems.splice(index, 1);
      },
      error => {
        console.error('Hiba a Todo törlésekor:', error);
      }
    );
  }

  calculateDaysExpired(expiryDate: Date): number {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - expiryDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  get items() {
    const currentDate = new Date();
    switch (this.filter) {
      case 'all':
        return this.allItems;
      case 'active':
        return this.allItems.filter(item => !item.done && new Date(item.expiryDate) > currentDate);
      case 'done':
        return this.allItems.filter(item => item.done);
      case 'expired':
        return this.allItems.filter(item => !item.done && new Date(item.expiryDate) <= currentDate);
      default:
        return [];
    }
  }

  getFilteredItemCount(): number {
    const currentDate = new Date();
    switch (this.filter) {
      case 'all':
        return this.items.length;
      case 'active':
        return this.items.filter(item => !item.done && new Date(item.expiryDate) > currentDate).length;
      case 'done':
        return this.items.filter(item => item.done).length;
      case 'expired':
        return this.items.filter(item => new Date(item.expiryDate) <= currentDate && !item.done).length;
      default:
        return 0;
    }
  }

  setFilter(filterValue: 'all' | 'active' | 'done' | 'expired') {
    this.filter = filterValue;
  }
  checkExpiredItems() {
    const expiredItems = this.allItems.filter(item => !item.done && new Date(item.expiryDate) <= new Date());
    if (expiredItems.length > 0) {
      let message = 'Figyelem! A következő feladatok lejártak:\n';
      for (const item of expiredItems) {
        const daysExpired = this.calculateDaysExpired(item.expiryDate);
        message += `- ${item.description}: lejárt ${daysExpired} napja.\n`;
      }
      alert(message);
    }
  }
}