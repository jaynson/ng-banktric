import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  accountName: string;
  // actionFired: boolean;
  timeLeft: number;
  timerSub: Subscription;
  constructor(private dashWorker: DashboardWorkerService) {}
  ngAfterContentChecked(): void {
    // this.actionFired = false;
    // this.newSub = this.dashWorker.startTimer().subscribe((val) => {
    //   console.log('new', this.timeLeft);
    // });
  }

  actionEmmited(ev: boolean) {
    if (!ev) return;
    this.timerSub.unsubscribe();
    this.timerSub = this.dashWorker.startTimer().subscribe((val) => {
      this.timeLeft = val;
    });
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.accountName = this.dashWorker.currentAccount().owner.split(' ')[0];
    this.timerSub = this.dashWorker.startTimer().subscribe((val) => {
      this.timeLeft = val;
    });
  }
}
