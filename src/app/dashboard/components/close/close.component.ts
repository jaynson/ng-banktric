import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

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
export class CloseComponent implements OnInit, AfterViewChecked {
  username: string;
  pin: string;
  isInvalid: boolean;

  constructor(
    private dashService: DashboardWorkerService,
    private router: Router
  ) {}
  ngAfterViewChecked(): void {
    if (this.username || this.pin) {
      this.isInvalid = false;
    }
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.username = form.value.uName;
    this.pin = form.value.pin;
    if (this.dashService.closeAccount(this.username, this.pin)) {
      this.isInvalid = false;
      this.router.navigateByUrl('/');
      this.username = '';
      this.pin = '';
      return;
    }
    this.isInvalid = true;
  }
}
