import { Component, Input } from '@angular/core';
import { TypeMovieDetails } from '../../../utils/utils';
import { LucideAngularModule, Play } from 'lucide-angular';

@Component({
  selector: 'PosterMovie',
  imports: [LucideAngularModule],
  template: `
    <section class="relative flex justify-center w-full mb-8 md:h-svh">
      <img
        src="https://image.tmdb.org/t/p/w1920{{ movie?.backdrop_path }}"
        alt="Hamnet"
        class="hidden md:block absolute inset-0 w-full h-full object-cover"
      />

      <div class="w-full aspect-2/3 md:aspect-auto relative">
        <div class="relative w-full h-full">
          <img
            src="https://image.tmdb.org/t/p/w1920{{ movie?.backdrop_path }}"
            alt="Hamnet"
            class="block md:hidden w-full h-full object-cover"
          />
          <div
            class="pointer-events-none absolute bottom-0 left-0 w-full h-[90%] bg-linear-to-t from-[#111] via-[#111]/85 md:via-[#111]/35 to-transparent"
          ></div>

          <div
            class="absolute bottom-0 left-0 z-10 flex flex-col w-full h-full p-8 md:pl-16 lg:pl-32 bg-linear-to-t from-[#111] via-[#111]/50 to-transparent md:bg-transparent md:flex-row-reverse md:items-center"
          >
            @if (movie?.id) {

            <div class="flex justify-center items-center flex-1 mb-6 md:mb-0">
              <div
                class="flex justify-center items-center bg-white/50 text-[#111] rounded-full cursor-pointer w-[15vw] h-[15vw] md:w-[8vw] md:h-[8vw]"
              >
                <i-lucide [img]="PlayIcon" class="size-[7vw] md:size-[3.5vw]"></i-lucide>
              </div>
            </div>
            }

            <div class="flex flex-col justify-center md:max-w-[40%]">
              <h4 class="flex flex-wrap items-center text-xs font-light mb-1 md:mb-2 gap-2">
                @if (movie?.adult) {
                <span class="hidden sm:flex items-center bg-white/25 rounded px-1 py-0.5">
                  +18
                </span>
                }
                <span class="flex items-center bg-white/25 rounded px-1 py-0.5">{{
                  movie?.vote_average?.toFixed(1)
                }}</span>
                <span class="truncate"
                  >{{ movie?.release_date?.split('-')?.[0] }} - {{ getGenresNames() }}</span
                >
              </h4>
              <h3 class="font-semibold text-2xl md:text-5xl mb-1 md:mb-2">{{ movie?.title }}</h3>
              <p class="text-xs md:text-base line-clamp-10">
                {{ movie?.overview }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PosterMovie {
  PlayIcon = Play;
  @Input() movie: TypeMovieDetails | null = null;

  getGenresNames(): string {
    if (!this.movie) {
      return '';
    }
    const genreNames = this.movie.genres?.map((genre) => genre.name).join(', ');
    return genreNames;
  }
}
