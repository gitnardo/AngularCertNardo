import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCardLoader]'
})
export class CardLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
