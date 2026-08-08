import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-delete-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-recipe.html',
  styleUrls: ['./delete-recipe.css']
})
export class DeleteRecipeComponent {
  recipes: Recipe[] = [];
  selectedRecipeId = '';
  private modalService = inject(NgbModal);

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data: any) => (this.recipes = data));
  }

  openConfirmationDialog(content: any) {
    if (!this.selectedRecipeId) return;

    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result
      .then((result) => {
        if (result === 'yes') this.deleteRecipe();
      })
      .catch(() => {});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipeId).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(r => r.recipeId !== this.selectedRecipeId);
        this.selectedRecipeId = '';
        alert('Recipe deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting recipe:', err);
        alert('Failed to delete recipe. Please try again.');
      }
    });
  }
}
