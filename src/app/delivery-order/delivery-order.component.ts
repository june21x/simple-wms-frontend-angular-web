import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SimpleWMSService } from '../service/simple-wms.service';
import { Order } from '../model/order';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { deserialize, serialize } from 'typescript-json-serializer';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Crate } from '../model/crate';
import { Vendor } from '../model/vendor';
import { Router } from '@angular/router';
import { Label } from '../model/label';
import { Transaction } from '../model/transaction';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeliveryOrderComponent implements OnInit, AfterViewInit {
  orderList = [];
  deliveryOrderList = [];
  dataSource = new MatTableDataSource<Order>();
  columnsToDisplay = ['repId', 'deliveryMethod', 'origin', 'destination', 'vendor', 'arrivalTimestamp', 'action'];
  expandedDeliveryOrder: Crate | null;
  @ViewChild(MatSort) sort: MatSort;

  crateIdList = [];

  durationInSeconds = 5;
  deliveryOrderRepId: string;

  constructor(private _apiService: SimpleWMSService, private _snackBar: MatSnackBar, private _router: Router) {

  }

  ngOnInit() {
    this.getAllDeliveryOrders();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllDeliveryOrders() {
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
            // Filter unassigned delivery order
            return order?.type === 'delivery' && order?.isCrateAssignedBefore() === false && order?.crates?.length > 0;
          });

          console.log('Filtered delivery list :');
          console.log(this.deliveryOrderList);

          this.dataSource.data = this.deliveryOrderList;
          this.dataSource.sortingDataAccessor = (deliveryOrder, property) => {
            switch (property) {
              case 'arrivalTimestamp': return deliveryOrder.getArrivalDate();
              default: return deliveryOrder[property];
            }
          };
        },
        error => {
          console.error(error);
        }
      )
  }

  receive(deliveryOrder: Order) {
    console.log('Start Assigning');

    deliveryOrder.crates.forEach(crate => {
      let deserializedCrate = deserialize<Crate>(crate, Crate);
      this.crateIdList.push(deserializedCrate?.id);
    });

    this.assignPallet(this.crateIdList);

    this.deliveryOrderRepId = deliveryOrder.repId;

  }

  assignPallet(crateIdList: string[]) {
    console.log(crateIdList);
    this._apiService.autoMultipleAssignPalletId(crateIdList)
      .subscribe(response => {
        console.log(response);
        this.openSnackBar(`The crates from Delivery Order ${this.deliveryOrderRepId} has been assigned to warehouse!`, 'Go to History');
        // this.getAllDeliveryOrders();
      }, error => {
        console.log(error);
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    }).onAction().subscribe(() => {
      this._router.navigate(['/History']);
    });
  }

}