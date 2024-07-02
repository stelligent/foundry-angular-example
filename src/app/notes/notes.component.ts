import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

export interface Note {
  id: number;
  content: string;
}

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  notes: Note[] = []; // Specify that 'notes' is an array of 'Note'

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.apiService.getNotes().subscribe((data: Note[]) => {
      // Specify that 'data' is an array of 'Note'
      this.notes = data;
    });
  }

  addNote(): void {
    const newNote = { content: 'New Note' }; // Ensure this matches the 'Note' interface
    this.apiService.addNote(newNote).subscribe(() => {
      this.fetchNotes();
    });
  }

  updateNote(note: Note): void {
    // Use 'Note' interface for type safety
    this.apiService
      .updateNote(note.id, { content: 'Updated Note' })
      .subscribe(() => {
        this.fetchNotes();
      });
  }

  deleteNote(id: number): void {
    this.apiService.deleteNote(id).subscribe(() => {
      this.fetchNotes();
    });
  }
}
