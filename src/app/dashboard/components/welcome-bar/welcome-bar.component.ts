import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-bar',
  templateUrl: './welcome-bar.component.html',
  styleUrls: ['./welcome-bar.component.scss'],
})
export class WelcomeBarComponent implements OnInit {
  @Input('displayName') name: string;
  @Output() loggingOff: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logoff() {
    this.router.navigateByUrl('/');
  }
}
