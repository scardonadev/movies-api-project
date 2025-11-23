import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContact } from './page-contact';

describe('PageContact', () => {
  let component: PageContact;
  let fixture: ComponentFixture<PageContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
