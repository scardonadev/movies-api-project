import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMovie } from './post-movie';

describe('PostMovie', () => {
  let component: PostMovie;
  let fixture: ComponentFixture<PostMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMovie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
