import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'currency-pipe-directive';
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      currency: [0.0],
    });
    this.onChanges();
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(() => {
      console.log(this.form.value);
    });
  }
}
