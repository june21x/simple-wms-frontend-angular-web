import { Component, OnInit } from '@angular/core';
import { SimpleWMSService } from '../service/simple-wms.service';
import { DeliveryOrder } from '../model/delivery-order';

@Component({
  selector: 'delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css']
})
export class DeliveryOrderComponent implements OnInit {
  deliveryOrderList:DeliveryOrder[];
  constructor(private _apiService: SimpleWMSService) { }

  ngOnInit() {
    this._apiService.getDeliveryOrder()
      .subscribe(
        data => {
            this.deliveryOrderList = data.data;
            console.log(this.deliveryOrderList);
        }
      )
  }

  
}