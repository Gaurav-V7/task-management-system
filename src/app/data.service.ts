import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task } from './Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = `${environment.apiUrl}/tasks`;

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getTasks().subscribe();
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(data => {
        const sortedData = data.sort((a, b) => {
          return a.completed == b.completed ? 0 : a.completed ? 1 : -1;
        });
        this.tasksSubject.next(data);
      })
    );
  }

  addTask(item: Task): Observable<HttpResponse<Task>> {
    return this.http.post<Task>(this.apiUrl, item, { observe: 'response' }).pipe(
      tap(() => this.getTasks().subscribe())
    );
  }

  updateTask(id: string, task: Task): Observable<HttpResponse<Task>> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { observe: 'response' }).pipe(
      tap(() => this.getTasks().subscribe())
    );
  }

  deleteItem(id: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { observe: 'response' }).pipe(
      tap(() => this.getTasks().subscribe())
    );
  }
}
