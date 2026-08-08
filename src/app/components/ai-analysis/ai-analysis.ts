import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AiService } from '../../services/ai.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-ai-analysis',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ai-analysis.html',
  styleUrls: ['./ai-analysis.css']
})
export class AiAnalysisComponent {
  recipe: any;
  analysis: string = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private aiService: AiService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;
      this.runAnalysis(recipe);
    });
  }

  runAnalysis(recipe: any) {
    this.loading = true;
    this.aiService.analyzeHealth(recipe.ingredients).subscribe({
      next: res => {
        this.analysis = res.output;
        this.loading = false;
      },
      error: err => {
        this.analysis = 'Error: ' + (err.error?.error || err.message);
        this.loading = false;
      }
    });
  }
}
