import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DeliveryMethod {
  value: string;
  viewValue: string;
}

interface Vendor {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'shipment-order',
  templateUrl: './shipment-order.component.html',
  styleUrls: ['./shipment-order.component.scss']
})

export class ShipmentOrderComponent implements OnInit {
  shipmentOrderForm: FormGroup;

  deliveryMethods: DeliveryMethod[] = [
    {value: 'cybertruck', viewValue: 'CyberTruck'},
    {value: 'model3', viewValue: 'Model 3'},
    {value: 'modelx', viewValue: 'Model X'},
    {value: 'falcon9', viewValue: 'Falcon 9'},
    {value: 'falconheavy', viewValue: 'Falcon Heavy'}
  ];

  vendors: Vendor[] = [
    {value: 'tesla', viewValue: 'Tesla'},
    {value: 'spacex', viewValue: 'SpaceX'},
    {value: 'grab', viewValue: 'Grab'},
    {value: 'ninjavan', viewValue: 'Ninja Van'}
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.shipmentOrderForm = this.formBuilder.group({
      labelId: [null, [Validators.required]],
      deliveryMethod: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      vendor: [null, [Validators.required]],
    });
  }

  submit() {
    if(!this.shipmentOrderForm.valid) {
      return;
    }
    console.log(this.shipmentOrderForm.value);
  }

}
