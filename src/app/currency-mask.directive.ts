import { CurrencyPipe } from '@angular/common';
import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';

import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appCurrencyMask]',
})
export class CurrencyMaskDirective implements AfterViewChecked {
  private el: HTMLInputElement;

  constructor(
    public ngControl: NgControl,
    private currencyPipe: CurrencyPipe,
    private elementRef: ElementRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked', this.el.value);
    this.onInputChange(this.el.value ?? 0.0);
  }

  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange(event: any) {
    var newValDiv = parseInt(event.replace(/[^0-9]/g, '')) / 100;
    var rawValue = newValDiv;

    let newVal = this.currencyPipe?.transform(newValDiv, 'BRL', true)?.toString();

    if (newVal?.length == 0) {
      newVal = '';
    } else {
      newVal = newVal;
    }
    // set the new value
    this.ngControl?.valueAccessor?.writeValue(newVal);
    this.rawChange.emit(rawValue.toString());
  }

}
