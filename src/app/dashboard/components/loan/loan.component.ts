import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  @ViewChild('loanInput') lInput: ElementRef;
  loanAmt: number | undefined;
  constructor(private dashWorker: DashboardWorkerService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loanAmt = form.value.loan;
    if (!this.dashWorker.requestLoan(this.loanAmt!)) return;
    this.loanAmt = undefined;
    this.lInput.nativeElement.blur();
  }
}
