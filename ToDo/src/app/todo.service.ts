import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  addTodo(todo: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, todo);
  }
  deleteTodo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  
  updateTodo(todo: Item): Observable<Item> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Item>(url, todo);
  }
}