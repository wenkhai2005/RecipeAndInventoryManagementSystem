import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-translation',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './language-translation.html',
})
export class TranslationComponent implements OnInit {
  recipe: any;
  translatedText: string = '';
  loading = false;
  selectedLang = 'es';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(id).subscribe((data) => (this.recipe = data));
    }
  }

  translateRecipe(): void {
    if (!this.recipe) return;
    this.loading = true;

    const text = `Title: ${this.recipe.title}
    Chef: ${this.recipe.chef}
    Cuisine: ${this.recipe.cuisineType}
    Difficulty: ${this.recipe.difficulty}
    Ingredients: ${this.recipe.ingredients.join(', ')}
    Instructions: ${this.recipe.instructions.join('. ')}`;

    this.translationService.translate(text, this.selectedLang).subscribe({
      next: (res) => {
        this.translatedText = res.translated;
        this.loading = false;
      },
      error: (err) => {
        this.translatedText = `Error: ${err.error}`;
        this.loading = false;
      },
    });
  }
}
