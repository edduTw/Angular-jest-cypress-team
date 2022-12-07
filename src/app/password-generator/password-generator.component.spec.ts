import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Generate button should be disabled at startup', () => {
    const submitEl = fixture.debugElement.query(By.css('button'));

    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });
});
