import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardWorkerService } from '../dashboard/services/dashboard-worker.service';
import { Account } from '../models';
import { AuthenticationWorkerService } from '../user-auth/services/authentication-worker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedin: boolean = false;
  private routeSub: Subscription;
  constructor(
    private authWorker: AuthenticationWorkerService,
    private dashWorker: DashboardWorkerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(() => {
      !this.authWorker.getAccountsList() && this.loadAccounts();
      if (this.isLoggedin) this.unloadDashboard();
    });
    console.log('FROM HOME!');
  }
  unloadDashboard() {
    this.isLoggedin = false;
    this.authWorker.logout();
  }

  loadAccounts() {
    this.authWorker.jsonAccountsRetriever();
  }
  loadDashboard(ev: boolean) {
    this.isLoggedin = ev;
    if (!ev) {
      return;
    }

    this.dashWorker.loadAccount(this.authWorker.getLoggedinAccount());
    this.dashWorker.loadAccountList(this.authWorker.getAccountsList());
    this.router.navigate([
      'accounts',
      this.authWorker.getLoggedinAccount()?.username,
    ]);
  }
  getLoadedAccount(): Account | undefined {
    return this.authWorker.getLoggedinAccount();
  }
}
