import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashboardWorkerService } from '../../services/dashboard-worker.service';

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
  receiver: string;
  amount: number | undefined;
  @ViewChildren('inputfield') inField: QueryList<ElementRef>;

  constructor(private dashService: DashboardWorkerService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.receiver = form.value.rec;
    this.amount = form.value.amt;
    if (!this.dashService.transfer(this.receiver, this.amount!)) {
      return;
    }
    this.inField.forEach((el) => el.nativeElement.blur());
    this.amount = undefined;
    this.receiver = '';
  }
}
