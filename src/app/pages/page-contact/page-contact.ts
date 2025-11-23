import { Component } from '@angular/core';
import { MainHeader } from '../../components/main-header/main-header';
import { Github, LucideAngularModule } from 'lucide-angular';
import { Phone } from 'lucide-angular/src/icons';

@Component({
  selector: 'PageContact',
  imports: [MainHeader, LucideAngularModule],
  template: `
    <!--
Crear una sección de página de contactos con:
- Encabezado con foto de perfil, título "Contactos" y un breve texto descriptivo.
- Un contenedor con dos bloques principales: correo y teléfono.
- Cada bloque debe tener un ícono circular, un título y texto informativo.
- Diseño limpio, centrado, minimalista y responsivo.
- Fondo claro, contenedor blanco con sombra suave.
-->
    <div>
      <MainHeader />
      <div class="flex flex-col items-center p-4 gap-8">
        <header class="flex flex-col items-center gap-16 pt-16">
          <h1 class="text-3xl font-bold mb-2">Contáctanos</h1>
          <p class="text-white text-center max-w-md">
            Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.
          </p>
        </header>
        <div
          class="flex flex-col w-fit max-w-lg p-8 border border-solid border-white/30 rounded-lg gap-16 md:flex-row"
        >
          @for (author of authors; track $index) {
          <div class="flex flex-col items-center gap-4">
            <div class="flex justify-center items-center rounded-full size-24 overflow-hidden">
              <img src="https://github.com/{{ author.github }}.png" alt="" />
            </div>
            <div class="flex flex-col items-center gap-0 text-center">
              <h3 class="text-xl font-semibold">{{ author.name }}</h3>
              <p class="text-white/60 font-light text-xs">
                <i-lucide
                  [img]="PhoneIcon"
                  name="phone"
                  class="size-3 inline-block mr-1"
                ></i-lucide>
                <a
                  href="https://api.whatsapp.com/send?phone={{ author.phone.slice(1) }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ author.phone }}</a
                >
              </p>
              <p class="text-white/60 font-light text-xs">
                <i-lucide
                  [img]="GithubIcon"
                  name="github"
                  class="size-3 inline-block mr-1"
                ></i-lucide>
                <a
                  href="https://github.com/{{ author.github }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ author.github }}</a
                >
              </p>
              <a class="text-white/60 font-light text-xs" href="mailto:{{ author.email }}">{{
                author.email
              }}</a>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class PageContact {
  readonly PhoneIcon = Phone;
  readonly GithubIcon = Github;
  readonly authors = [
    {
      name: 'Sebastian Cardona',
      github: 'scardonadev',
      phone: '+573147282165',
      email: 'scardonap@ucompensar.edu.co',
    },
    {
      name: 'Mateo Cardona',
      github: 'matecardev',
      phone: '+573128970432',
      email: 'mcardonap@ucompensar.edu.co',
    },
  ];
}
