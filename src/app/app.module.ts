import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ShipmentOrderComponent } from './shipment-order/shipment-order.component';
import { SimpleWMSService } from './service/simple-wms.service';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryOrderComponent,
    WarehouseComponent,
    ShipmentOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [SimpleWMSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
