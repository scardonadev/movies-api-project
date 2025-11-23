import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'App',
  imports: [RouterOutlet],
  template: `
    <div class="bg-[#111] text-white min-h-svh">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {}
