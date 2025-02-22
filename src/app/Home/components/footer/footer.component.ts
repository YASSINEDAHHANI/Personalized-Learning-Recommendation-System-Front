import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  bubbles = new Array(128); // Creates an array of 128 items

  getBubbleStyles(i: number) {
    const size = 2 + Math.random() * 4;
    const distance = 6 + Math.random() * 4;
    const position = -5 + Math.random() * 110;
    const time = 2 + Math.random() * 2;
    const delay = -1 * (2 + Math.random() * 2);

    return {
      '--size': `${size}rem`,
      '--distance': `${distance}rem`,
      '--position': `${position}%`,
      '--time': `${time}s`,
      '--delay': `${delay}s`
    };
  }
}
