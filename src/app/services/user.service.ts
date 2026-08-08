import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {

  users = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  loadUsers() {
    this.http.get<any[]>('/api/user-34389792').subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Failed to load users:', err),
    });
  }

  createUser(user: any) {
    return this.http.post('/api/register-34389792', user);
  }

  verifyUser(user: any) {
    return this.http.post('/api/login-34389792', user);
  }

  getUsers() {
    return this.http.get('/api/user-34389792');
  }
}
