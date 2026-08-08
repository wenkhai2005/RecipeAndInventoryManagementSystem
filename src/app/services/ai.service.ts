import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(private http: HttpClient) {}

  analyzeHealth(ingredients: string[]): Observable<any> {
    return this.http.post('/api/ai-analysis-34389792', { ingredients });
  }
}
