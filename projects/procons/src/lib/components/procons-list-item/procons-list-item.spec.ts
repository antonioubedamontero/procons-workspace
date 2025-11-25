import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
      description: ['item description', [Validators.required, Validators.minLength(4)]],
      score: 8,
    });

    fixture.componentRef.setInput('listItemType', 'pro');
    fixture.componentRef.setInput('listItemFormGroup', listItemFormGroup);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have an html input for description with proper value', () => {
    const descriptionHtmlInput: HTMLInputElement =
      fixture.nativeElement.querySelector('input#description');
    expect(descriptionHtmlInput).toBeTruthy();

    const inputComponentDescription = component.getControlFromGroup('description').value;
    expect(descriptionHtmlInput.value).toBe(inputComponentDescription);
  });

  describe('should return a custom placeholder', () => {
    it('when listItemType has "pro" value', () => {
      fixture.componentRef.setInput('listItemType', 'pro');
      fixture.detectChanges();
      const descriptionHtmlInput: HTMLInputElement =
        fixture.nativeElement.querySelector('input#description');
      expect(descriptionHtmlInput.placeholder).toBe('Escribe el pro');
    });

    it('when listItemType has "con" value', () => {
      fixture.componentRef.setInput('listItemType', 'con');
      fixture.detectChanges();
      const descriptionHtmlInput: HTMLInputElement =
        fixture.nativeElement.querySelector('input#description');
      expect(descriptionHtmlInput.placeholder).toBe('Escribe el contra');
    });
  });

  it('should have an html slider for score', () => {
    const scoreHtmlDiv: HTMLDivElement = fixture.nativeElement.querySelector(
      'div#score-slider-container'
    );
    expect(scoreHtmlDiv).toBeTruthy();

    expect(scoreHtmlDiv.querySelector('mat-slider')).toBeTruthy();
    expect(scoreHtmlDiv.querySelector('span.value')).toBeTruthy();
  });

  it('should render score in slider with proper value', () => {
    const inputSliderHtml: HTMLInputElement =
      fixture.nativeElement.querySelector('mat-slider input');

    const inputScore = component.getControlFromGroup('score').value;
    expect(Number(inputSliderHtml.value)).toBe(inputScore);
  });

  it('should render score value next to slider with proper value', () => {
    const htmlSlider: HTMLSpanElement = fixture.nativeElement.querySelector('span.value');
    const sliderComponentInput = component.getControlFromGroup('score');

    expect(Number(htmlSlider.textContent)).toBe(sliderComponentInput.value);
  });

  it('score in slider should be between 0 to 10', () => {
    const inputSliderHtml: HTMLInputElement =
      fixture.nativeElement.querySelector('mat-slider input');
    expect(Number(inputSliderHtml.min)).toBe(0);
    expect(Number(inputSliderHtml.max)).toBe(10);
  });

  it('should have a delete element button', () => {
    const deleteButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'div.delete-button button'
    );
    expect(deleteButton).toBeTruthy();
  });

  it('when click on delete button, should emmit deleteButtonPressed event', () => {
    const deleteButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'div.delete-button button'
    );
    const deleteButtonPressedSpy = spyOn(component.deleteButtonPressed, 'emit');
    deleteButton.click();
    expect(deleteButtonPressedSpy).toHaveBeenCalledTimes(1);
    expect(deleteButtonPressedSpy).toHaveBeenCalledWith(true);
  });

  describe('when hasError recibes a field name', () => {
    it('should return false is field is ok', () => {
      const hasDescriptionError = component.hasError('description');
      expect(hasDescriptionError).toBeFalsy();
    });

    it('should return true is field has an error and has been touched', () => {
      const descriptionControl = component.getControlFromGroup('description');
      descriptionControl.setValue(null);
      descriptionControl.markAsDirty();
      descriptionControl.updateValueAndValidity();

      const hasDescriptionError = component.hasError('description');
      expect(hasDescriptionError).toBeTruthy();
    });
  });

  describe('when hasError receives a field error', () => {
    it('should return a required error message', () => {
      const descriptionControl = component.getControlFromGroup('description');
      descriptionControl.setValue(null);
      descriptionControl.markAsDirty();
      descriptionControl.updateValueAndValidity();

      expect(component.getErrorsFromField('description')).toBe('Este campo es obligatorio');
    });

    it('should return a min error length message', () => {
      const descriptionControl = component.getControlFromGroup('description');
      descriptionControl.setValue('hi');
      descriptionControl.markAsDirty();
      descriptionControl.updateValueAndValidity();

      expect(component.getErrorsFromField('description')).toContain('Debe tener al menos');
    });
  });
});
