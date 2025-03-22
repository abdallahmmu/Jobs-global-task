import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSeeMore]',
  standalone: true,
})
export class SeeMoreDirective implements OnChanges {
  @Input('appSeeMore') text: string = '';
  @Input() maxLength: number = 100;
  private isExpanded: boolean = false;
  private toggleButton!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) {
      this.updateText();
    }
  }

  private updateText() {
    this.el.nativeElement.innerHTML =
      this.text.length > this.maxLength
        ? this.text.substring(0, this.maxLength) + '...'
        : this.text;
    if (this.text.length > this.maxLength) {
      this.createToggleButton();
    }
  }

  private createToggleButton() {
    this.toggleButton = this.renderer.createElement('span');
    this.toggleButton.innerText = ' See More';
    this.renderer.setStyle(this.toggleButton, 'color', 'blue');
    this.renderer.setStyle(this.toggleButton, 'cursor', 'pointer');
    this.renderer.listen(this.toggleButton, 'click', () => this.toggleText());
    this.renderer.appendChild(this.el.nativeElement, this.toggleButton);
  }

  private toggleText() {
    this.isExpanded = !this.isExpanded;
    this.el.nativeElement.innerHTML = this.isExpanded
      ? this.text
      : this.text.substring(0, this.maxLength) + '...';
    this.toggleButton.innerText = this.isExpanded ? ' See Less' : ' See More';
    this.renderer.appendChild(this.el.nativeElement, this.toggleButton);
  }
}
