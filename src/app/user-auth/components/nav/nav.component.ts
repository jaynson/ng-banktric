import {
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
  Input,
  DoCheck,
  Output,
  EventEmitter,
  AfterContentChecked,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from 'src/app/models';
import { AuthenticationWorkerService } from '../../services/authentication-worker.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, AfterContentChecked {
  username: string;
  pin: string;
  @ViewChild('pinInput') pInput: ElementRef;
  @Input() currentAccount: Account | undefined;
  @Output() userLoggedin: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private worker: AuthenticationWorkerService) {}
  ngAfterContentChecked(): void {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.username = form.value.uname;
    this.pin = form.value.pin;
    // console.log(this.worker.);
    if (this.worker.login(this.username, this.pin)) {
      this.userLoggedin.emit(true);
    } else {
      this.userLoggedin.emit(false);
    }
    this.username = '';
    this.pin = '';

    this.pInput.nativeElement.blur();
    this.currentAccount = this.worker.getLoggedinAccount();
  }
}
