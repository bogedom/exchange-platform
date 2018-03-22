import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/services/data.service';
import { OrdersComponent } from './orders/orders.component';
import { routing } from './app.routings';
import { OrderFormComponent } from './orders/order-form/order-form.component';
import { BookListComponent } from './orders/book-list/book-list.component';
import { BookItemComponent } from './orders/book-list/book-item/book-item.component';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderFormComponent,
    BookListComponent,
    BookItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    routing,
    BrowserAnimationsModule,
    ToasterModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
