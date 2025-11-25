import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DebugElement, input, output } from '@angular/core';

import { ProconsList } from './procons-list';
import { ListItemType, ProconsListItemDataControls } from '../../interfaces';
import { ProconsListItem } from '../procons-list-item/procons-list-item';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'lib-procons-list-item',
  template: '<p>procons list item</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProconsListItemMock {
  listItemType = input.required<ListItemType>();
  listItemFormGroup = input.required<FormGroup<ProconsListItemDataControls>>();

  deleteButtonPressed = output<boolean>();
}

describe('ProconsList', () => {
  let component: ProconsList;
  let fixture: ComponentFixture<ProconsList>;
  let fb: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProconsListItem],
    }).overrideComponent(ProconsList, {
      add: {
        imports: [ProconsListItemMock],
      },
      remove: {
        imports: [ProconsListItem],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProconsList);
    component = fixture.componentInstance;

    fb = TestBed.inject(FormBuilder);

    const proconsListData = fb.array([
      fb.group({
        description: ['Campo 1', [Validators.required, Validators.minLength(4)]],
        score: [4, [Validators.required]],
      }),
      fb.group({
        description: ['Campo 2', [Validators.required, Validators.minLength(4)]],
        score: [7, [Validators.required]],
      }),
      fb.group({
        description: ['Campo 3', [Validators.required, Validators.minLength(4)]],
        score: [9, [Validators.required]],
      }),
    ]);

    fixture.componentRef.setInput('listItemType', 'pro');
    fixture.componentRef.setInput('proconsListData', proconsListData);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render a procons list wrapper', () => {
    const htmlProconsListWrapper: ProconsListItem =
      fixture.nativeElement.querySelector('div.procons-list');
    expect(htmlProconsListWrapper).toBeTruthy();
  });

  it('should render three procons-list-items', () => {
    const htmlProconsListItems: ProconsListItem[] =
      fixture.nativeElement.querySelectorAll('lib-procons-list-item');
    expect(htmlProconsListItems.length).toBe(3);
  });

  it('should have an add button', () => {
    const htmlAddButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'div.procons-list__add-button button'
    );
    expect(htmlAddButton).toBeTruthy();
  });

  it('should add a new empty element when click on add button', () => {
    const htmlAddButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'div.procons-list__add-button button'
    );

    htmlAddButton.click();

    fixture.detectChanges();

    const htmlProconsListItems: ProconsListItem[] =
      fixture.nativeElement.querySelectorAll('lib-procons-list-item');
    expect(htmlProconsListItems.length).toBe(4);
  });

  it('should remove an element if receive a remove elment on a procons-list-item', (done) => {
    const htmlProconsListItems: DebugElement[] = fixture.debugElement.queryAll(
      By.css('lib-procons-list-item')
    );

    htmlProconsListItems[0].componentInstance.deleteButtonPressed.emit(true);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('lib-procons-list-item')).length).toBe(2);
      done();
    });
  });
});
