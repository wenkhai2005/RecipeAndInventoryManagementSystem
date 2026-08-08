import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TtsSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(); 
  }

  playInstructions(recipeId: string, instructionsText: string) {
    this.socket.emit("playInstructions", { recipeId, instructionsText });
  }

  onAudioReady(): Observable<{ recipeId: string, audioUrl: string }> {
    return new Observable(observer => {
      this.socket.on("audioReady", (data) => {
        observer.next(data);
      });
    });
  }

  onAudioError(): Observable<{ recipeId: string, error: string }> {
    return new Observable(observer => {
      this.socket.on("audioError", (data) => {
        observer.next(data);
      });
    });
  }
}
