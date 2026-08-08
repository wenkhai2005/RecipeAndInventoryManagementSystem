import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-recipe.html',
  styleUrls: ['./edit-recipe.css']
})

export class EditRecipeComponent {
  recipe: Recipe | null = null;
  ingredientsText = '';
  instructionsText = '';
  successMessage = '';
  errorMessage = '';

  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  cuisineTypes = ['Italian', 'Asian', 'Mexican', 'American', 'French', 'Indian', 'Mediterranean', 'Other'];
  difficulties = ['Easy', 'Medium', 'Hard'];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (data: any) => {
          this.recipe = data;
          this.ingredientsText = data.ingredients?.join(', ') || '';
          this.instructionsText = data.instructions?.join(', ') || '';
        },
        error: (err) => {
          console.error('Error loading recipe:', err);
          this.errorMessage = 'Failed to load recipe. Please try again.';
        }
      });
    }
  }

  onSubmit(form: NgForm) {
    if (!this.recipe || form.invalid) return;

    const userIdPattern = /^U-\d{5}$/;
    if (!this.recipe.userId || !userIdPattern.test(this.recipe.userId)) {
      this.errorMessage = 'Invalid user ID format. Must be U-XXXXX (5 digits).';
      this.successMessage = '';
      return;
    }


    const updatedRecipe = {
      ...this.recipe,
      ingredients: this.ingredientsText
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length >= 3),
      instructions: this.instructionsText
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length >= 10),
    };

    this.recipeService.updateRecipe(this.recipe.recipeId!, updatedRecipe).subscribe({
      next: () => {
        this.successMessage = 'Recipe updated successfully!';
        this.errorMessage = '';
        this.router.navigate(['/recipes-34389792']);
      },
      error: (err) => {
        const backendMsg = err.error?.message || 'Failed to update recipe.';
        console.error('Update recipe error:', backendMsg);

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
      },
    });
  }
}
