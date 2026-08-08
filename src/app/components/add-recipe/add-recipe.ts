import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-recipe.html',
  styleUrls: ['./add-recipe.css']
})
export class AddRecipeComponent {
  recipe: Recipe = new Recipe();
  successMessage = '';
  errorMessage = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  addRecipe(form: NgForm) {
    
    if (form.invalid) return;

    this.recipeService.createRecipe(this.recipe).subscribe({
      next: () => {
        this.successMessage = 'Recipe added successfully!';
        this.errorMessage = '';
        this.router.navigate(['/recipes-34389792']);
        form.resetForm();
      },
      error: (err) => {
        
        const backendMsg = err.error?.message || 'Failed to add recipe.';
        console.error('Add recipe error:', backendMsg);

        if (backendMsg.includes('Duplicate')) {
          this.errorMessage = 'A recipe with this title already exists for this user.';
        } else if (backendMsg.includes('userId format')) {
          this.errorMessage = 'Invalid user ID format. Use U-XXXXX (5 digits).';
        } else if (backendMsg.includes('User ID not found')) {
          this.errorMessage = 'This User ID does not exist. Please register first.';
        } else {
          this.errorMessage = backendMsg;
        }

        this.successMessage = '';
      }
    });
  }
}
