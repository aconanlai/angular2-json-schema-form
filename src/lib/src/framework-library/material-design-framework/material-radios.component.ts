import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared';

@Component({
  selector: 'material-radios-widget',
  template: `
    <div *ngIf="options?.title">
      <label
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
    </div>
    <md-radio-group
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [attr.readonly]="options?.readonly ? 'readonly' : null"
      [attr.required]="options?.required"
      [style.flex-direction]="flexDirection"
      [disabled]="controlDisabled"
      [name]="controlName"
      [value]="controlValue">
      <md-radio-button *ngFor="let radioItem of radiosList"
        [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
        [value]="radioItem?.value"
        (click)="updateValue(radioItem?.value)">
        <span [innerHTML]="radioItem?.name"></span>
      </md-radio-button>
    </md-radio-group>`,
  styles: [`
    md-radio-group { display: inline-flex; }
    md-radio-button { margin: 2px; }
  `]
})
export class MaterialRadiosComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;
  flexDirection: string = 'column';
  radiosList: any[] = [];
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    if (this.layoutNode.type === 'radios-inline') {
      this.flexDirection = 'row';
    }
    this.radiosList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum, true
    );
    this.jsf.initializeControl(this);
  }

  updateValue(value) {
    this.jsf.updateValue(this, value);
  }
}
