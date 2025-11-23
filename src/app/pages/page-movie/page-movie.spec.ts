import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMovie } from './page-movie';

describe('PageMovie', () => {
  let component: PageMovie;
  let fixture: ComponentFixture<PageMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMovie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
