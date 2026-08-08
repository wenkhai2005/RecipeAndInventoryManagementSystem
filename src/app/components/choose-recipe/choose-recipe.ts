import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-choose-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './choose-recipe.html',
})
export class ChooseRecipeComponent {
  recipes: Recipe[] = [];
  selectedId: string = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe({
      next: (data: any) => (this.recipes = data),
      error: (err) => console.error('Error fetching recipes:', err),
    });
  }

  onConfirm() {
    if (this.selectedId) {
      this.router.navigate([`/edit-recipe-34389792`, this.selectedId]);
    }
  }
}
