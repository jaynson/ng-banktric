import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styles: [
    `
      .operation--close {
        background-image: linear-gradient(to top left, #e52a5a, #ff585f);
      }
    `,
  ],
})
export class CloseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
