import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Procons } from './procons';

describe('Procons', () => {
  let component: Procons;
  let fixture: ComponentFixture<Procons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Procons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Procons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
