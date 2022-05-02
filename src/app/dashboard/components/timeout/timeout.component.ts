import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationWorkerService } from 'src/app/user-auth/services/authentication-worker.service';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-timeout',
  template: `<p class="logout-timer">
    You will be logged out in
    <span class="timer">{{ minutes }}:{{ seconds }}</span>
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
export class TimeoutComponent implements OnInit, OnChanges {
  seconds: string;
  minutes: string;
  @Input('timer') timeLeft: number;
  constructor(
    private authService: AuthenticationWorkerService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.tick();
  }

  ngOnInit(): void {
    // this.startTimer();
  }

  tick = () => {
    this.minutes = this.timeLeft
      ? String(Math.trunc(this.timeLeft / 60)).padStart(2, '0')
      : '--';
    this.seconds = this.timeLeft
      ? String(this.timeLeft % 60).padStart(2, '0')
      : '--';

    //Stop timer when time runs out
    if (this.timeLeft === 0) {
      this.authService.logout();
      this.router.navigateByUrl('/');
    }
  };

  // startTimer() {
  //   let time = 600;
  //   const tick = () => {
  //     this.minutes = String(Math.trunc(time / 60)).padStart(2, '0');
  //     this.seconds = String(time % 60).padStart(2, '0');

  //     //Stop timer when time runs out
  //     if (time === 0) {
  //       // clearInterval(timer);
  //       this.authService.logout();
  //       this.router.navigateByUrl('/');
  //     }
  //     time--;
  //   };

  //   // tick();

  //   // const timer = setInterval(tick, 1000);

  //   return timer;
  // }
}
