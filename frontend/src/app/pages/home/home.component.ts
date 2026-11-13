import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShoppingCart } from '@core/shopping-cart/shopping-cart';
import { ShoppingCartService } from '@core/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ShoppingCart],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private shoppingCartService = inject(ShoppingCartService);
  isOpen = false;

  openCart(): void {
    this.shoppingCartService.showCart();
  }
}
