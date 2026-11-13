import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCart } from '@core/shopping-cart/shopping-cart';
import { ShoppingCartService } from '@core/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ShoppingCart],
  templateUrl: './contact.page.html'
})
export class ContactPage {
  private shoppingCartService = inject(ShoppingCartService);
  isOpen = false;

  openCart(): void {
    this.shoppingCartService.showCart();
  }
}
