import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './view-recipe.html',
  styleUrls: ['./view-recipe.css']
})
export class ViewRecipeComponent {
  recipe: any;
  socket!: Socket;
  isSpeaking = false;
  audioUrl: string | null = null;
  audio: HTMLAudioElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;
    });

    this.socket = io('http://localhost:8080');

    this.socket.on('audioReady', (data: { audioUrl: string }) => {
      this.audioUrl = data.audioUrl;
      this.playAudio();
    });

    this.socket.on('audioError', (data: { error: string }) => {
      alert('Text-to-speech failed: ' + data.error);
      this.isSpeaking = false;
    });
  }

  playAudio() {
    if (this.audioUrl) {
      this.audio = new Audio(this.audioUrl);
      this.audio.play();
      this.isSpeaking = true;

      this.audio.onended = () => {
        this.isSpeaking = false;
      };
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isSpeaking = false;
    }
  }

  toggleSpeech() {
    if (this.isSpeaking) {
      this.stopAudio();
    } else {
      const text = this.recipe.instructions.join('. ');
      this.socket.emit('playInstructions', {
        recipeId: this.recipe.recipeId,
        instructionsText: text
      });
    }
  }

  deleteRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        alert('Recipe deleted successfully.');
        this.router.navigate(['/recipes-34389792']);
      });
    }
  }
}
