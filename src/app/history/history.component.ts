import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SimpleWMSService } from '../service/simple-wms.service';
import { Order } from '../model/order';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { deserialize, serialize } from 'typescript-json-serializer';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Crate } from '../model/crate';
import { Vendor } from '../model/vendor';
import { Label } from '../model/label';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit, AfterViewInit {
  orderList = [];
  deliveryOrderList = [];
  shipmentOrderList = [];
  deliveryOrderDataSource = new MatTableDataSource<Order>();
  shipmentOrderDataSource = new MatTableDataSource<Order>();
  deliveryOrderColumns = ['repId', 'deliveryMethod', 'origin', 'destination', 'vendor', 'arrivalTimestamp'];
  shipmentOrderColumns = ['repId', 'deliveryMethod', 'origin', 'destination', 'vendor', 'departureTimestamp'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _apiService: SimpleWMSService,) { }

  ngOnInit() {
    this.getAllOrders();
  }

  ngAfterViewInit() {
    this.deliveryOrderDataSource.sort = this.sort;
    this.shipmentOrderDataSource.sort = this.sort;
  }

  getAllOrders() {
    this._apiService.getAllOrderList()
      .subscribe(
        response => {
          response['output'].forEach(order => {
            // Deserialize Order
            let deserializedOrder = deserialize<Order>(order, Order);

            // Deserialize Crates
            let deserializedCrateList = [];
            order['crates'].forEach(crate => {
              deserializedCrateList.push(deserialize<Crate>(crate, Crate));
            });
            deserializedOrder.crates = deserializedCrateList;

            // Deserialize Vendor
            deserializedOrder.vendor = deserialize<Vendor>(order['vendor'][0], Vendor);

            // Deserialize Label
            deserializedOrder.label = deserialize<Label>(order['label'][0], Label);

            // Deserialize Transaction
            deserializedOrder.transaction = deserialize<Transaction>(order['transaction'][0], Transaction);

            this.orderList.push(deserializedOrder);
          });

          this.deliveryOrderList = this.orderList.filter((order: Order) => {
            // Filter assigned delivery order
            return order?.type === 'delivery' && order?.isCrateAssignedBefore() === true && order?.crates?.length > 0;
          });

          this.shipmentOrderList = this.orderList.filter((order: Order) => {
            // Filter issued shipment order
            return order?.type === 'shipment' && order?.isAllCratesAssigned() === false && order?.crates?.length > 0;
          });

          this.deliveryOrderDataSource.data = this.deliveryOrderList;
          this.shipmentOrderDataSource.data = this.shipmentOrderList;

          this.deliveryOrderDataSource.sortingDataAccessor = (deliveryOrder, property) => {
            switch (property) {
              case 'arrivalTimestamp': return deliveryOrder.getArrivalDate();
              default: return deliveryOrder[property];
            }
          };

          this.shipmentOrderDataSource.sortingDataAccessor = (shipmentOrder, property) => {
            switch (property) {
              case 'departureTimestamp': return shipmentOrder.getDepartureDate();
              default: return shipmentOrder[property];
            }
          };

          console.log(`Assigned Delivery Orders: ${this.deliveryOrderList}`);
          console.log(`Issued Shipment Orders: ${this.shipmentOrderList}`);
        },
        error => {
          console.error(error);
        }
      )
  }
}