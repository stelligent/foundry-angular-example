import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './notes/notes.component'; // Ensure the correct path

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = window.location.origin;
  private apiUrl = `${this.baseUrl}/api/notes`;

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(id: number, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
