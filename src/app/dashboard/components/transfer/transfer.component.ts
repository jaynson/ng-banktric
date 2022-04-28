import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styles: [
    `
      .operation--transfer {
        background-image: linear-gradient(to top left, #ffb003, #ffcb03);
      }
    `,
  ],
})
export class TransferComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
