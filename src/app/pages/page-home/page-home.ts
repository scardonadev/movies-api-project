import { Component, signal } from '@angular/core';
import { MainHeader } from '../../components/main-header/main-header';
import { SuggestMovie } from '../../components/suggest-movie/suggest-movie';
import {
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
  getUpcomingMovies,
  TypeGenre,
  TypeMovie,
} from '../../../utils/utils';
import { BasicScrollMovies } from '../../components/basic-scroll-movies/basic-scroll-movies';

@Component({
  selector: 'PageHome',
  imports: [MainHeader, SuggestMovie, BasicScrollMovies],
  template: `
    <div>
      <MainHeader />
      <main>
        <SuggestMovie [movie]="suggestedMovie()" [genres]="genres()" fixed="true" />
        <BasicScrollMovies
          type="sm"
          [movies]="mostViewedMovies()"
          [genres]="genres()"
          title="Lo más visto"
        />
        <BasicScrollMovies
          type="sm"
          [movies]="popularMovies()"
          [genres]="genres()"
          title="Películas populares"
        />
        <BasicScrollMovies
          type="md"
          [movies]="upcomingMovies()"
          [genres]="genres()"
          title="Próximos estrenos"
        />
        <BasicScrollMovies
          type="sm"
          [movies]="animatedMovies()"
          [genres]="genres()"
          title="Películas animadas"
        />
        <BasicScrollMovies
          type="sm"
          [movies]="actionMovies()"
          [genres]="genres()"
          title="Películas de guerra"
        />
      </main>
    </div>
  `,
})
export class PageHome {
  readonly genres = signal<TypeGenre[]>([]);
  readonly suggestedMovie = signal<TypeMovie>({} as TypeMovie);
  readonly mostViewedMovies = signal<TypeMovie[]>([]);
  readonly popularMovies = signal<TypeMovie[]>([]);
  readonly upcomingMovies = signal<TypeMovie[]>([]);
  readonly animatedMovies = signal<TypeMovie[]>([]);
  readonly actionMovies = signal<TypeMovie[]>([]);

  async ngOnInit() {
    //Obtener géneros de películas
    this.genres.set(await getGenres());

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

    //Obtener próximos estrenos
    const upcomingMovies = await getUpcomingMovies();
    this.upcomingMovies.set(upcomingMovies);

    //Obtener películas de animación
    this.animatedMovies.set(await getMoviesByGenre('animación', this.genres()));
    //Obtener películas de acción
    this.actionMovies.set(await getMoviesByGenre('bélica', this.genres()));
  }
}
