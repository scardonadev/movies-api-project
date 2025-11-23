import { Component, signal } from '@angular/core';
import { MainHeader } from '../../components/main-header/main-header';
import { SuggestMovie } from '../../components/suggest-movie/suggest-movie';
import { getGenres, getPopularMovies, TypeGenre, TypeMovie } from '../../../utils/utils';
import { BasicScrollMovies } from '../../components/basic-scroll-movies/basic-scroll-movies';

@Component({
  selector: 'PageHome',
  imports: [MainHeader, SuggestMovie, BasicScrollMovies],
  template: `
    <div>
      <MainHeader />
      <main>
        <SuggestMovie [movie]="suggestedMovie()" [genres]="genres()" />
        <BasicScrollMovies [movies]="mostViewedMovies()" [genres]="genres()" title="Lo más visto" />
        <BasicScrollMovies [movies]="popularMovies()" title="Películas populares" />
      </main>
    </div>
  `,
})
export class PageHome {
  readonly suggestedMovie = signal<TypeMovie | null>(null);
  readonly mostViewedMovies = signal<TypeMovie[]>([]);
  readonly popularMovies = signal<TypeMovie[]>([]);
  readonly genres = signal<TypeGenre[]>([]);

  async ngOnInit() {
    //Devolver todas las películas populares
    const popularMovies = await getPopularMovies();

    //Seleccionar una película al azar para sugerir
    const randomIndex = Math.floor(Math.random() * popularMovies.length);
    this.suggestedMovie.set(popularMovies[randomIndex]);
    popularMovies.splice(randomIndex, 1);

    //Dividir las películas restantes en dos grupos: más vistas y populares
    const halfIndex = Math.ceil(popularMovies.length / 2);
    this.mostViewedMovies.set(popularMovies.slice(0, halfIndex));
    this.popularMovies.set(popularMovies.slice(halfIndex));

    //Obtener géneros de películas
    this.genres.set(await getGenres());
  }
}
