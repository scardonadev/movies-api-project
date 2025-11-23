import { Routes } from '@angular/router';
import { PageHome } from './pages/page-home/page-home';
import { PageMovie } from './pages/page-movie/page-movie';
import { PageContact } from './pages/page-contact/page-contact';

export const routes: Routes = [
  { path: '', component: PageHome },
  { path: 'movie', component: PageMovie },
  { path: 'contact', component: PageContact },
  { path: '**', redirectTo: '' },
];
