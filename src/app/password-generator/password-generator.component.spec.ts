import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PasswordGeneratorComponent } from './password-generator.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PasswordGeneratorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button should be disabled when app renders', () => {
    fixture.detectChanges();
    const buttonSubmit = fixture.nativeElement;
    expect(buttonSubmit.querySelector('button').disabled).toBeTruthy();
  });

  // it('Generate button must be enabled when non-empty length is met and at least one option is selected'), () => {

  // };

  it('field length minimum accepted value should be 4', () => {
    const inputLength = component.form.get('passLength');
    inputLength?.setValue('3');
    fixture.detectChanges();

    expect(inputLength?.hasError('min')).toBeTruthy();

    inputLength?.setValue('5');
    fixture.detectChanges();

    expect(inputLength?.hasError('min')).toBeFalsy();
  })

  it('at least one checkbox must be selected', () => {
    const app = fixture.componentInstance;
    expect(app.disabledButton).toBeTruthy();
    const checkbox1 = fixture.debugElement.query(By.css('#chkLetters')).nativeElement;
    expect(checkbox1.checked).toBeFalsy();
    expect(app.disabledButton).toBeTruthy();

    checkbox1.click();
    fixture.detectChanges();
    expect(checkbox1.checked).toBeTruthy()
    expect(app.disabledButton).toBeFalsy();
    
  })
});
