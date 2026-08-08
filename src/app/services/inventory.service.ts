import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Inventory } from '../models/userInventory';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventories = signal<Inventory[]>([]);

  constructor(private http: HttpClient) {}

  loadInventories() {
    this.http.get<any>('/api/inventory-34389792').subscribe({
      next: (data) => {
        this.inventories.set(data.inventories || []);
      },
      error: (err) => console.error('Failed to load inventories:', err),
    });
  }

  createInventory(item: any) {
    return this.http.post('/api/add-inventory-34389792', item, httpOptions);
  }

  getInventories() {
    return this.http.get('/api/inventory-34389792');
  }

  getInventoryById(id: string) {
    return this.http.get(`/api/inventory-34389792/${id}`);
  }

  deleteInventory(id: string) {
    return this.http.delete(`/api/delete-inventory-34389792/${id}`);
  }

  updateInventory(id: string, item: any) {
    return this.http.put(`/api/edit-inventory-34389792/${id}`, item, httpOptions);
  }
}
