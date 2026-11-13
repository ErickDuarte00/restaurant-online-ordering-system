import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { MenuPage } from '@pages/menu/menu.page';
import { CheckoutPage } from '@pages/checkout/checkout.page';
import { OrderPage } from '@pages/order/order.page';
import { AdminPage } from '@pages/admin/admin.page';
import { LoginPage } from '@pages/admin/login/login';
import { OrderDetail } from '@core/order/order-detail/order-detail';
import { orderDetailResolver } from '@core/order/order-detail/order-detail-resolver';
import { authGuard } from '@guards/auth-guard';
import { AdminDashboardComponent } from '@core/admin-dashboard/admin-dashboard';
import { AdminKitchen } from '@core/admin-kitchen/admin-kitchen';
import { AboutComponent } from '@pages/about/about.component';
import { ContactPage } from '@pages/contact/contact.page';
import { UbicationPage } from '@pages/ubication/ubication.page';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Café Parralito | Inicio',
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    component: MenuPage,
    title: 'Café Parralito | Menú',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Café Parralito | Acerca de Nosotros',
  },
  {
    path: 'contact',
    component: ContactPage,
    title: 'Café Parralito | Contacto',
  },
  {
    path: 'ubication',
    component: UbicationPage,
    title: 'Café Parralito | Ubicación',
  },
  {
    path: 'checkout',
    component: CheckoutPage,
    title: 'Completar Pedido',
  },
  {
    path: 'order',
    component: OrderPage,
    title: 'Tus Pedidos',
  },
  {
    path: 'order/:id',
    component: OrderDetail,
    resolve: {
      order: orderDetailResolver,
    },
  },
  {
    path: 'admin',
    component: AdminPage,
    title: 'Panel de Administrador',
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      { path: 'kitchen', component: AdminKitchen },
    ],
    canActivate: [authGuard],
  },
  { path: 'admin/login', component: LoginPage },
];
