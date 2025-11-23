import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestMovie } from './suggest-movie';

describe('SuggestMovie', () => {
  let component: SuggestMovie;
  let fixture: ComponentFixture<SuggestMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestMovie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
