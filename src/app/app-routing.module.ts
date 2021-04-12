import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShipmentOrderComponent } from './shipment-order/shipment-order.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/warehouse', pathMatch: 'full'},
  { path: 'delivery-order', component: DeliveryOrderComponent, data: {subTitle: 'Delivery Order', description: 'Welcome new crates.'}},
  { path: 'warehouse', component: WarehouseComponent, data: {subTitle: 'Warehouse', description: 'Track your warehouse\'s health.'}},
  { path: 'shipment-order', component: ShipmentOrderComponent, data: {subTitle: 'Create New Shipment Order', description: 'Your crates are ready to depart.'}},
  { path: 'history', component: HistoryComponent, data: {subTitle: 'History', description: 'A record of delivery orders and shipment orders.'}},
  { path: '**', component: PageNotFoundComponent, data: {subTitle: 'Oops!'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DeliveryOrderComponent, WarehouseComponent, ShipmentOrderComponent, HistoryComponent, PageNotFoundComponent]