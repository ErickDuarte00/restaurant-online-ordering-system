import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ubication',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ubication.page.html'
})
export class UbicationPage {
  isOpen = false;
}
