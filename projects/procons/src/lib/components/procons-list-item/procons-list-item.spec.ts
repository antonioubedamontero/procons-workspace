import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ProconsListItem } from './procons-list-item';

describe('ProconsListItem', () => {
  let component: ProconsListItem;
  let fixture: ComponentFixture<ProconsListItem>;
  let fb: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProconsListItem],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProconsListItem);
    component = fixture.componentInstance;

    fb = TestBed.inject(FormBuilder);
    const listItemFormGroup = fb.group({
      description: ['item description'],
      score: 8,
    });

    fixture.componentRef.setInput('listItemType', 'pro');
    fixture.componentRef.setInput('listItemFormGroup', listItemFormGroup);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
