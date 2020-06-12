import { AbstractControl } from '@angular/forms';

export function HtmlTagsValidator(control: AbstractControl) {
  if (control.value.match(/<[^>]*>/m)) {
    return { htmlTagsInvalid: true };
  }

  return null;
}
