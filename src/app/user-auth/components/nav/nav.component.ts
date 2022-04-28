import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  Input,
  DoCheck,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from 'src/app/models';
import { AuthenticationWorkerService } from '../../services/authentication-worker.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, DoCheck {
  @ViewChild('pinInput') pInput: ElementRef;
  @Input() currentAccount: Account | undefined;
  username: string;
  pin: string;
  constructor(private worker: AuthenticationWorkerService) {}
  ngDoCheck(): void {
    // this.currentAccount = this.worker.getLoggedinAccount();
    console.log('INTSUB', this.currentAccount);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES', changes);
  }

  ngOnInit(): void {
    // this.username = '';
    // this.pin = '';
    this.worker.jsonAccountsRetriever();
  }

  onSubmit(form: NgForm) {
    console.log('Subbb', form.value);
    this.username = form.value.uname;
    this.pin = form.value.pin;
    this.worker.login(this.username, this.pin)
      ? console.log('Win')
      : console.log('Lean');
    this.username = '';
    this.pin = '';
    this.pInput.nativeElement.blur();
    this.currentAccount = this.worker.getLoggedinAccount();
    console.log('INTSUB', this.currentAccount);
  }
}
