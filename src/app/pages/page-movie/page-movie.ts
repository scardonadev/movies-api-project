import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  getGenres,
  getMoviesByGenre,
  getMoviesById,
  TypeMovie,
  TypeMovieDetails,
} from '../../../utils/utils';
import { MainHeader } from '../../components/main-header/main-header';
import { PosterMovie } from '../../components/post-movie/post-movie';
import { BasicScrollMovies } from '../../components/basic-scroll-movies/basic-scroll-movies';

@Component({
  selector: 'PageMovie',
  imports: [MainHeader, PosterMovie, BasicScrollMovies],
  template: `
    <div>
      <MainHeader [fixed]="true" />
      <PosterMovie [movie]="movie()" />
      <BasicScrollMovies title="Similares" [movies]="similarMovies()" />
    </div>
  `,
})
export class PageMovie {
  //get id from url
  id: string | null = null;
  movie = signal<TypeMovieDetails>({} as TypeMovieDetails);
  similarMovies = signal<TypeMovie[]>([]);

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      if (this.id) {
        this.movie.set(await getMoviesById(Number(this.id)));
      }
      this.similarMovies.set(
        await getMoviesByGenre(this.movie().genres[0].name, await getGenres())
      );

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
