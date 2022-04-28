import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeout',
  template: `<p class="logout-timer">
    You will be logged out in <span class="timer">min:sec</span>
  </p>`,
  styles: [
    `
      .logout-timer {
        padding: 0 0.3rem;
        margin-top: 1.9rem;
        text-align: right;
        font-size: 1.25rem;
      }

      .timer {
        font-weight: 600;
      }
    `,
  ],
})
export class TimeoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
