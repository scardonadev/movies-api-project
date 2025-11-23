import { Component, Input } from '@angular/core';
import { TypeMovie } from '../../../utils/utils';

@Component({
  selector: 'BasicScrollMovies',
  imports: [],
  template: `
    <section id="mostViewedMovies" class="flex justify-center mb-8">
      <div id="mostViewedMoviesWrapper" class="flex flex-col w-full max-w-7xl gap-4 px-4">
        <h2 class="font-semibold text-2xl">{{ title }}</h2>
        <div class="overflow-x-auto">
          <div class="w-fit max-w-fit h-full whitespace-nowrap min-w-full pb-2 ">
            @for (movie of movies; track $index) {
            <a
              class="not-first:ml-2 md:not-first:ml-4 group inline-flex relative h-auto w-[calc(33%-1.5rem)] md:w-[calc(16%-1.5rem)] rounded-lg aspect-2/3 overflow-hidden shadow-[0_0_1.5rem_-0.85rem_rgba(0,0,0,0.8)] select-none cursor-pointer transition-all duration-300 hover:scale-95"
            >
              <img
                src="{{ 'https://image.tmdb.org/t/p/w500' + movie.poster_path }}"
                alt="{{ movie.original_title }}"
              />
              <div
                class="group flex justify-center absolute bottom-0 left-0 w-full pt-8 px-2 pb-2 text-2xl bg-[linear-gradient(0deg,rgba(0,0,0,0.85)_10%,rgba(0,0,0,0)_100%)] opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <h4
                  class="font-extralight text-[8px] md:text-[10px] text-center overflow-hidden text-ellipsis"
                >
                  @if (movie.adult) {<span class="hidden labelAdults bg-white/25 rounded px-1 mr-1"
                    >+18</span
                  >}
                  <span class="labelGenres">{{ getGenresNames(movie) }}</span>
                </h4>
              </div>
            </a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class BasicScrollMovies {
  @Input() movies: TypeMovie[] = [];
  @Input() genres: any[] = [];
  @Input() title: string = '';

  getGenresNames(movie: TypeMovie): string {
    if (!movie) {
      return '';
    }
    const genreNames = movie.genre_ids
      .map((id) => {
        const genre = this.genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name !== null);
    return genreNames.join(', ');
  }
}
