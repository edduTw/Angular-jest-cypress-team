import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { PasswordService } from '../data/password.service';

const getListCheckboxes = () => [
  { id: 1, name: 'chkLetters', title: 'Use Letters' },
  { id: 2, name: 'chkNumbers', title: 'Use Numbers' },
  { id: 3, name: 'chkSymbols', title: 'Use Symbols' },
];

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
})

export class PasswordGeneratorComponent implements OnInit {
  text: string = '';

  arrayOfConditions: any[] = [];

  form!: FormGroup;

  submitted: boolean = false;

  passLength!: string;

  newPassword: string = '';

  disabledButton: boolean = true;

  get chkConditionsFormArray() {
    return this.form.controls.chkConditions as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private passwordServices: PasswordService) {
    this.text = 'Button was clicked';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      passLength: ['', [Validators.required, Validators.min(4)]],
      chkConditions: new FormArray([]),
    });

    of(getListCheckboxes()).subscribe((conditions) => {
      this.arrayOfConditions = conditions;
      this.addCheckboxes();
    });
  }

  private addCheckboxes() {
    this.arrayOfConditions.forEach(() => this.chkConditionsFormArray.push(new FormControl(false)));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  generateClicked() {
    this.submitted = true;

    this.passwordServices
      .getPassword(
        parseInt(this.passLength),
        this.chkConditionsFormArray.value[0], // text
        this.chkConditionsFormArray.value[1], // number
        this.chkConditionsFormArray.value[2], // symbol
      )
      .subscribe((result) => { this.newPassword = result });
  }

  optionChecked() {
    this.disabledButton = this.validateCheckbox();
  }

  validateCheckbox(): boolean {
    let disable: boolean = true;

    this.chkConditionsFormArray.value.forEach((op: boolean) => {
      disable = op ? !op : disable;
    });

    return disable;
  }
}
