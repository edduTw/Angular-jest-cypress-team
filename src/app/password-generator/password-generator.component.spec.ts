import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PasswordGeneratorComponent } from './password-generator.component';
import { BrowserModule,By } from '@angular/platform-browser';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordGeneratorComponent],
      imports: [BrowserModule, ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('general', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should create a form with 2 controls', () => {
      expect(component.form.contains('passLength')).toBeTruthy();
      expect(component.form.contains('chkConditions')).toBeTruthy();
    });
  });
 

  describe('validations', () => {
    it('Generate button should be disabled at startup', () => {
      const submitEl = fixture.debugElement.query(By.css('button'));
  
      expect(submitEl.nativeElement.disabled).toBeTruthy();
    });

    it('Length field should be required', () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.nativeElement.value = "";
      inputEl.triggerEventHandler('blur', null);
      fixture.detectChanges();

      expect(inputEl.nativeElement.value).toBe("");
      expect(component.form.get('passLength')?.valid).toBeFalsy();

      expect(fixture.debugElement.nativeElement.innerHTML).toContain("Password Length is required");

    });

    it('Length field should have a minimum value of 4', () => {
      const inputLength = component.form.get('passLength');
      inputLength?.setValue('3');
      fixture.detectChanges();

      expect(inputLength?.hasError('min')).toBeTruthy();
    });

    it('Length field should have a minimum value of 4', () => {
      // expect(inputLength?.valid).toBeFalsy();
      // let event = new KeyboardEvent('keydown', {
      //   key: '3',
      // });
      const event = new Event('KeyboardEvent') as any;
      event.code = "3";
      event.key = '3';

      const inputEl =fixture.debugElement.query(By.css('input'));
      // inputEl.nativeElement.value = "3";
      inputEl.triggerEventHandler('blur', null);
      // inputEl.triggerEventHandler('keydown', { key: '3' });
      
      inputEl.triggerEventHandler('keypress', event);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe("3");
      expect(component.form.get('passLength')?.valid).toBeFalsy();
    
      expect(fixture.debugElement.nativeElement.innerHTML).toContain("Minimum value is 4");       
      
    });
  });
  
  describe('generate password', () => {
    it('should call generateClicked method', () => {
      const onClickMock = spyOn(component, 'generateClicked');
      fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
      expect(onClickMock).toHaveBeenCalled();
    });
  });
  

  //Generate button must be enabled when non-empty length is met and at least one option is selected
  //when click on the Generate button we should get a new password
  //validate that all fields are displayed
});
