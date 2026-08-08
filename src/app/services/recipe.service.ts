import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  recipes = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  loadRecipes() {
    this.http.get<any[]>('/api/recipes-34389792').subscribe({
      next: (data) => this.recipes.set(data),
      error: (err) => console.error('Failed to load recipes:', err),
    });
  }

  createRecipe(recipe: any) {
    return this.http.post('/api/add-recipe-34389792', recipe, httpOptions);
  }

  getRecipes() {
    return this.http.get('/api/recipes-34389792');
  }

  getRecipeById(id: string) {
    return this.http.get(`/api/recipes-34389792/${id}`);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`/api/delete-recipe-34389792/${id}`);
  }

  updateRecipe(id: string, recipe: any) {
    return this.http.put(`/api/edit-recipe-34389792/${id}`, recipe);
  }
}
