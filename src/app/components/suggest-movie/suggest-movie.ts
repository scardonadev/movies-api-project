import { Component, Input } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { TypeGenre, TypeMovie } from '../../../utils/utils';

@Component({
  selector: 'SuggestMovie',
  imports: [LucideAngularModule],
  template: `
    <section class="flex justify-center mb-8">
      <div class="w-full max-w-7xl aspect-4/5 md:aspect-video px-4">
        <div
          class="w-full h-full relative rounded-2xl overflow-hidden shadow-[0_0_1.5rem_-0.85rem_rgba(0,0,0,0.8)] select-none cursor-pointer"
        >
          <img
            src="{{ 'https://image.tmdb.org/t/p/w1920' + movie?.backdrop_path }}"
            alt="{{ movie?.original_title }}"
            class="w-full h-full object-cover object-center"
          />
          <div
            class="flex justify-start absolute bottom-0 left-0 w-full pt-20 px-6 pb-6 md:p-20 md:pr-6 text-2xl bg-[linear-gradient(0deg,rgba(0,0,0,1)_20%,rgba(0,0,0,0.8)_50%,rgba(0,0,0,0)_100%)]"
          >
            <div class="w-full md:max-w-1/2">
              <h4 class="flex flex-wrap font-extralight text-[10px] min-h-[1em]">
                @if (movie?.adult) {
                <span class="bg-white/25 rounded px-1 mr-2">+18</span>
                }
                <i-lucide [img]="StarIcon" class="size-[1em] text-orange-400 mr-1">4.5</i-lucide>
                <span> {{ getGenresNames() }} </span>
              </h4>
              <h3 data-skeleton="true" class="font-semibold mb-2">{{ movie?.title }}</h3>
              <p
                data-skeleton="true"
                class="text-xs overflow-hidden line-clamp-3 md:line-clamp-none"
              >
                {{ movie?.overview }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SuggestMovie {
  @Input() movie: TypeMovie | null = null;
  @Input() genres: TypeGenre[] = [];

  readonly StarIcon = Star;

  getGenresNames(): string {
    if (!this.movie) {
      return '';
    }
    const genreNames = this.movie.genre_ids
      .map((id) => {
        const genre = this.genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name !== null);
    return genreNames.join(', ');
  }
}
