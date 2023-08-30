import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#e6e6e6', 'pointer'); // Change color and cursor as needed
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null, 'auto');
  }

  private highlight(backgroundColor: string | null, cursor: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', backgroundColor);
    this.renderer.setStyle(this.el.nativeElement, 'cursor', cursor);
  }
}