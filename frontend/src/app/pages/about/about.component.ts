import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCart } from '@core/shopping-cart/shopping-cart';
import { ShoppingCartService } from '@core/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, ShoppingCart],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private shoppingCartService = inject(ShoppingCartService);
  isOpen: boolean = false; 

  openCart(): void {
    this.shoppingCartService.showCart();
  }
}
