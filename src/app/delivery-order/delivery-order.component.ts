import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SimpleWMSService } from '../service/simple-wms.service';
import { DeliveryOrder } from '../model/delivery-order';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { deserialize } from 'typescript-json-serializer';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeliveryOrderComponent implements OnInit, AfterViewInit{
  deliveryOrderList = new Array<DeliveryOrder>();
  dataSource = new MatTableDataSource<DeliveryOrder>();
  columnsToDisplay = ['id', 'deliveryMethod', 'origin', 'destination', 'vendorId', 'arrivalTimestamp', 'action'];
  expandedDeliveryOrder: DeliveryOrder | null;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _apiService: SimpleWMSService) { 
    
  }

  ngOnInit() {
    this._apiService.getDeliveryOrderList()
      .subscribe(
        response => {
          let deserializedList = new Array<DeliveryOrder>();
          let dataList = response;
          dataList.forEach(function (deliveryOrder) {
            
            deserializedList.push(deserialize<DeliveryOrder>(deliveryOrder, DeliveryOrder));
            
          })
          this.deliveryOrderList = deserializedList;
          this.dataSource.data = this.deliveryOrderList;
          this.dataSource.sortingDataAccessor = (deliveryOrder, property) => {
            switch (property) {
              case 'arrivalTimestamp': return deliveryOrder.getArrivalDate();
              default: return deliveryOrder[property];
            }
          };
          console.log(this.deliveryOrderList[0].getArrivalDate());
        },
        error => {
          console.log(error);
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}