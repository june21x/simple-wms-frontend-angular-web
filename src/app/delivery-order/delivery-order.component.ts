import { Component, OnInit } from '@angular/core';
import { SimpleWMSService } from '../service/simple-wms.service';
import { DeliveryOrder } from '../model/delivery-order';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { deserialize } from 'typescript-json-serializer';

@Component({
  selector: 'delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeliveryOrderComponent implements OnInit {
  deliveryOrderList = new Array<DeliveryOrder>();
  columnsToDisplay = ['id', 'deliveryMethod', 'origin', 'destination', 'vendorId', 'arrivalDateTime', 'action'];
  expandedDeliveryOrder: DeliveryOrder | null;

  constructor(private _apiService: SimpleWMSService) { }

  ngOnInit() {
    this._apiService.getDeliveryOrderList()
      .subscribe(
        response => { 
          let deserializedList = new Array<DeliveryOrder>();
          let dataList = response.data;
          dataList.forEach (function (value) {
            deserializedList.push(deserialize<DeliveryOrder>(value, DeliveryOrder));
          })
          this.deliveryOrderList = deserializedList;

          console.log(this.deliveryOrderList[0]);
        },
        error => {
          console.log(error);
        }
      )
       
  }

  
}