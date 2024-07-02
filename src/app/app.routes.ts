import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { TestRouteComponent } from './test-route/test-route.component';

export const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'test', component: TestRouteComponent },
];
