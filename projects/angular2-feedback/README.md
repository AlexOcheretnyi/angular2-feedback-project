# Angular2-Feedback

> A light and easy to use feedback library for Angular 2. Its feature dedicated to store user's feedback. 

## Setup

Install library

```shell
npm install --save angular2-feedback
```

Add Angular2FeedbackModule in to your AppModule or CoreModule.
```shell
import { Angular2FeedbackModule } from 'angular2-feedback';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2FeedbackModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Add the Angular2FeedbackComponent in to your AppComponent.

```shell
...
template: `<angular2-feedback></angular2-feedback>`
...
```

## Publishing

After building your library with `ng build angular2-feedback`, go to the dist folder `cd dist/angular2-feedback` and run `npm publish`.

## Running unit tests

Run `ng test angular2-feedback` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
