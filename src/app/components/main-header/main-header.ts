import { Component, Input } from '@angular/core';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';
import { Search } from 'lucide-angular/src/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'MainHeader',
  imports: [LucideAngularModule, RouterLink],
  template: `
    <header
      class="flex w-full justify-between p-4 md:p-8 z-10 {{
        fixed ? 'absolute top-0 left-0 z-99' : ''
      }}"
    >
      <a routerLink="/" class="flex items-center flex-1 text-3xl font-black no-underline">
        <span class="text-red-600">.</span>Movi<span class="-rotate-30 inline-block">e</span>
      </a>
      <form class="flex justify-center items-center flex-2">
        <div class="relative w-full max-w-[400px] hidden md:flex">
          <input
            type="text"
            name="text"
            placeholder="Busca tu película favorita"
            class="border border-white/30 bg-transparent w-full rounded-full px-4 py-2 placeholder:opacity-30 placeholder:font-light outline-none"
          />
          <button
            type="submit"
            name="search"
            class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 w-fit cursor-pointer text-white bg-white/30 hover:bg-white transition-all duration-300 rounded-full"
          >
            <i-lucide [img]="SearchIcon" name="search" class="size-4"></i-lucide>
          </button>
        </div>
      </form>
      <div class="flex justify-end items-center flex-1 gap-2">
        <a
          routerLink="/contact"
          class="flex justify-center items-center bg-white p-4 w-fit h-10 text-black rounded-full font-black"
        >
          Contacto
        </a>
      </div>
    </header>
  `,
})
export class MainHeader {
  readonly SearchIcon = Search;
  @Input() fixed: boolean = false;
}
