import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProconsList } from './procons-list';

describe('ProconsList', () => {
  let component: ProconsList;
  let fixture: ComponentFixture<ProconsList>;
  let fb: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProconsList],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProconsList);
    component = fixture.componentInstance;

    fb = TestBed.inject(FormBuilder);

    const proconsListData = fb.array([]);

    fixture.componentRef.setInput('listItemType', 'pro');
    fixture.componentRef.setInput('proconsListData', proconsListData);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
