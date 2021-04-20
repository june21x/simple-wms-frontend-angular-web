import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleWMSService } from '../service/simple-wms.service';
import { map, startWith, tap } from 'rxjs/operators';
import { Crate } from '../model/crate';
import { deserialize, serialize } from 'typescript-json-serializer';
import { Order } from '../model/order';
import { Vendor } from '../model/vendor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Origin {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'shipment-order',
  templateUrl: './shipment-order.component.html',
  styleUrls: ['./shipment-order.component.scss'],
})

export class ShipmentOrderComponent implements OnInit {
  shipmentOrderForm: FormGroup;
  shipmentOrderReviewForm: FormGroup;

  // Stepper
  isEditable = true;
  isLinear = true;

  // Chip autocomplete
  placeholder = "Add crate...";
  clientsideFilter = true;
  removable = true;
  isOptionString = false;
  isChipAddFromInput = true;
  required = true;
  displayWith = "id";
  itemid = "id";
  isOptionCheckable = true;
  disabledSelected = true;
  maxCrate = null;
  selectedCrateList: Crate[] = [];
  selectedCrateIdList: number[] = [];


  crateList = [];
  vendorList = [];

  // Review
  shipmentOrderId: number;
  origin: string = '';
  destination: string = '';
  vendor: Vendor;
  deliveryMethod: string = '';
  departureDate: Date;
  note: string = '';

  durationInSeconds = 5;
  shipmentOrderRepId: number;

  submitted = false;

  origins: Origin[] = [
    { value: 'Warehouse', viewValue: 'Warehouse' },
  ];

  deliveryMethods: string[] = [
    "Truck, DHL",
    "Truck, FedEx",
    "Motorcycle, Grab",
    "Motorcycle, Gojek",
    "Shipping, Maersk",
    "Shipping, Evergreen",
    "Shipping, Hapag-Lloyd",
    "Shipping, MSC",
    "Shipping, COSCO",
    "Airplane, FedEx",
    "Airplane, DHL",
    "Airplane, Cargolux",
    "Airplane, Cathay Pacific",
    "Airplane, Emirates",
    "Airplane, Singapore Airlines",
  ]

  constructor(private _formBuilder: FormBuilder, private _apiService: SimpleWMSService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
    this.buildShipmentOrderForm();
    this.getAllCratesInWarehouse();
    this.getSelectedCrateList();
    this.getAllVendors();
  }

  private buildShipmentOrderForm(): void {
    this.shipmentOrderForm = this._formBuilder.group({
      crates: [null],
      origin: [null, Validators.required],
      destination: [null, [Validators.required]],
      vendor: [null, [Validators.required]],
      deliveryMethod: [null, [Validators.required]],
    });

    this.shipmentOrderReviewForm = this._formBuilder.group({

    })
  }

  getAllCratesInWarehouse() {
    //TODO get all crates from warehouse only
    this._apiService.getCrateList()
      .subscribe(
        response => {
          response.forEach(crate => {
            let deserializedCrate = deserialize<Crate>(crate, Crate);
            this.crateList.push(deserializedCrate);
          });

          this.crateList = this.crateList.filter((crate: Crate) => {
            return crate.palletId != null;
          });

          console.log(this.crateList);

        },
        error => {
          console.error(error);
        }
      );
  }

  getSelectedCrateList() {
    this.shipmentOrderForm.controls["crates"].valueChanges
      .pipe(
        tap(value => console.log(value))
      )
      .subscribe(selectedCrates =>
        this.selectedCrateList = selectedCrates
      )

  }

  getAllVendors() {
    this._apiService.getAllVendorList()
      .subscribe(response => {
        response.forEach(vendor => {
          this.vendorList.push(deserialize<Vendor>(vendor, Vendor));
        })
      })
  }

  hasError = (controlName: string, errorName: string) => {
    return this.shipmentOrderForm.controls[controlName].hasError(errorName);
  }

  review() {
    if (!this.shipmentOrderForm.valid) {
      return;
    }

    this.origin = this.shipmentOrderForm.controls['origin'].value;
    this.destination = this.shipmentOrderForm.controls['destination'].value;
    this.vendor = this.shipmentOrderForm.controls['vendor'].value;
    this.deliveryMethod = this.shipmentOrderForm.controls['deliveryMethod'].value;
    this.departureDate = new Date();
    this.note = '';

  }

  submit() {
    if (!this.shipmentOrderForm.valid) {
      return;
    }

    const shipmentOrderData = serialize(
      new Order(
        this.origin,
        this.destination,
        this.vendor.id.toString(),
        this.deliveryMethod,
        this.departureDate.toJSON(),
        this.note,
      )
    );

    console.log(shipmentOrderData);

    this.createNewShipmentOrder(shipmentOrderData);
  }

  createNewShipmentOrder(shipmentOrderData) {
    this._apiService.createNewShipmentOrder(shipmentOrderData)
      .subscribe(response => {
        console.log(response);
        console.log(response.id);
        this.shipmentOrderId = response['id'];
        this.shipmentOrderRepId = response['rep_id];']
        this.linkShipmentOrderId(this.shipmentOrderId);

      }, error => {
        console.error(error);
      })
  }

  linkShipmentOrderId(shipmentOrderId?) {
    this.selectedCrateList.forEach(crate =>
      this.selectedCrateIdList.push(crate.id)
    );

    let data = this.selectedCrateIdList;

    console.log(data);

    this._apiService.linkShipmentOrderId(shipmentOrderId, data)
      .subscribe(response => {
        console.log(response);
        this.removeCratesFromPallets();


        this.openSnackBar(`New Shipment Order ${this.shipmentOrderRepId} has been created!`, 'Go to History');
      }, error => {
        console.error(error);
      })
  }

  removeCratesFromPallets() {
    this._apiService.removeCratesFromPallets(this.selectedCrateIdList)
      .subscribe(response => {
        console.log(this.selectedCrateIdList);
        console.log(response);
        this.submitted = true;
      }, error => {
        console.error(error);
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
