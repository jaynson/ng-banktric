import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit, AfterContentChecked {
  accountName: string;
  actionFired: boolean;
  constructor(private dashWorker: DashboardWorkerService) {}
  ngAfterContentChecked(): void {
    this.actionFired = false;
  }

  actionEmmited(ev: boolean) {
    this.actionFired = ev;
  }

  ngOnInit(): void {
    this.accountName = this.dashWorker.currentAccount().owner.split(' ')[0];
  }
}
