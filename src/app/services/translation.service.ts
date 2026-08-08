import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private apiUrl = '/api/translate-recipe-34389792';

  constructor(private http: HttpClient) {}

  translate(text: string, targetLang: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { text, targetLang });
  }
}
