import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { BookItemComponent } from './orders/book-list/book-item/book-item.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      {
        path: '',
        redirectTo: 'btcusd',
        pathMatch: 'full'
      },
      {
        path: ':symbol',
        component: BookItemComponent
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
