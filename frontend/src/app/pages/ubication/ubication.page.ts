import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCart } from '@core/shopping-cart/shopping-cart';
import { ShoppingCartService } from '@core/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-ubication',
  standalone: true,
  imports: [CommonModule, RouterModule, ShoppingCart],
  templateUrl: './ubication.page.html'
})
export class UbicationPage {
  private shoppingCartService = inject(ShoppingCartService);
  isOpen = false;

  openCart(): void {
    this.shoppingCartService.showCart();
  }
}
