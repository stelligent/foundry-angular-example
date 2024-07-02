import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ApiService } from '../api.service';

export interface Note {
  id: number;
  content: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [NgFor, FormsModule], // Include FormsModule here
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNoteContent: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.apiService.getNotes().subscribe((data: Note[]) => {
      this.notes = data;
    });
  }

  addNote(): void {
    const newNote = { content: this.newNoteContent };
    this.apiService.addNote(newNote).subscribe(() => {
      this.fetchNotes();
    });
  }

  prepareUpdate(note: Note): void {
    const updatedNote = { ...note, content: 'Updated Note' };
    this.updateNote(updatedNote);
  }

  updateNote(note: Note): void {
    this.apiService.updateNote(note.id, note).subscribe(() => {
      this.fetchNotes();
    });
  }

  deleteNote(id: number): void {
    this.apiService.deleteNote(id).subscribe(() => {
      this.fetchNotes();
    });
  }
}
