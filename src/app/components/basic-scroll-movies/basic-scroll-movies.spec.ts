import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicScrollMovies } from './basic-scroll-movies';

describe('BasicScrollMovies', () => {
  let component: BasicScrollMovies;
  let fixture: ComponentFixture<BasicScrollMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicScrollMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicScrollMovies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
