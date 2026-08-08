import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-all-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-recipe.html',
})
export class AllRecipesComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe({
      next: (data: any) => {
        this.recipes = data;
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
      },
    });
  }

  deleteRecipe(id: string) {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        alert('Recipe deleted successfully!');
        this.loadRecipes(); 
      },
      error: (err) => {
        console.error('Error deleting recipe:', err);
        alert('Error deleting recipe.');
      },
    });
  }
}
