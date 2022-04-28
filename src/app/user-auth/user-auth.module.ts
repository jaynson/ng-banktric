import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [NavComponent],
})
export class UserAuthModule {}
