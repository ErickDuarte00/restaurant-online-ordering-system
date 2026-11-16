import { Component, inject, ViewChild, input, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './shopping-cart.interface';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DrawerModule } from 'primeng/drawer';
import { Drawer } from 'primeng/drawer';
import { CartItem as CartItemComponent } from '@core/shopping-cart/cart-item/cart-item';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    CurrencyPipe,
    DecimalPipe,
    ButtonModule,
    BadgeModule,
    DrawerModule,
    CartItemComponent,
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  private drawerRef = viewChild<Drawer>('drawerRef');

  private shoppingCartService = inject(ShoppingCartService);
  private router = inject(Router);

  cartVisible = false;
  cartTotal = 0;
  cartItemCount = 0;
  cartItems: CartItem[] = [];

  private cartSubscription?: Subscription;
  private displaySubscription?: Subscription;

  ngOnInit() {
    this.cartVisible = false;

    // Subscribe to cart changes
    this.cartSubscription = this.shoppingCartService.cart$.subscribe((cart) => {
      this.cartTotal = cart.total;
      this.cartItemCount = cart.itemCount;
      this.cartItems = cart.items;
    });

    this.displaySubscription = this.shoppingCartService.cartDisplay$.subscribe((isDisplayed) => {
      this.cartVisible = isDisplayed;
    });
  }

  closeCallback(e?: any): void {
    this.drawerRef()?.close(e);
    this.cartVisible = false;
    this.shoppingCartService.hideCart();
  }

  onVisibleChange(visible: boolean): void {
    this.cartVisible = visible;
    if (!visible) {
      this.shoppingCartService.hideCart();
    }
  }

  showCart() {
    this.cartVisible = true;
  }

  proceedToCheckout(): void {
    this.cartVisible = false;
    this.shoppingCartService.hideCart();
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
    this.displaySubscription?.unsubscribe();
    this.shoppingCartService.hideCart();
  }
}
