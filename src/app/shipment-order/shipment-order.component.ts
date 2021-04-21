import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleWMSService } from '../service/simple-wms.service';
import { tap } from 'rxjs/operators';
import { Crate } from '../model/crate';
import { deserialize, serialize } from 'typescript-json-serializer';
import { Order } from '../model/order';
import { Vendor } from '../model/vendor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Transaction } from '../model/transaction';

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
  displayWith = "idDisplay";
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
  totalValue: number = 0.00;
  origin: string = '';
  destination: string = '';
  vendor: Vendor;
  deliveryMethod: string = '';
  departureDate: Date;
  note: string = '';

  durationInSeconds = 5;
  transactionId: string;
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
      crates: [null, Validators.required],
      origin: [null, Validators.required],
      destination: [null, [Validators.required]],
      vendor: [null, [Validators.required]],
      deliveryMethod: [null, [Validators.required]],
    });

    this.shipmentOrderReviewForm = this._formBuilder.group({

    })
  }

  getAllCratesInWarehouse() {

    this._apiService.getCrateList()
      .subscribe(
        response => {
          response.forEach(crate => {
            let deserializedCrate = deserialize<Crate>(crate, Crate);
            deserializedCrate.setIdDisplay();
            this.crateList.push(deserializedCrate);
          });

          // Filter all crates from warehouse only
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
    return this.shipmentOrderForm.controls[controlName]?.hasError(errorName);
  }

  review() {
    if (!this.shipmentOrderForm.valid) {
      return;
    }

    this.selectedCrateList.forEach(crate => {
      this.totalValue += parseFloat(crate.getTotalValue().substring(2));
    })

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

    this.createNewShipmentOrder();
  }

  createNewShipmentOrder() {
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

    this._apiService.createNewShipmentOrder(shipmentOrderData)
      .subscribe(response => {
        console.log(response);
        console.log(response.id);
        this.shipmentOrderId = response['id'];
        this.shipmentOrderRepId = response['rep_id'];

        this.linkCrateShipmentOrderId();

      }, error => {
        console.error(error);
      })
  }

  linkCrateShipmentOrderId() {
    this.selectedCrateList.forEach(crate =>
      this.selectedCrateIdList.push(crate.id)
    );

    let data = this.selectedCrateIdList;

    console.log(data);

    this._apiService.linkCrateShipmentOrderId(this.shipmentOrderId, data)
      .subscribe(response => {
        console.log(response);

        this.removeCratesFromPallets();

      }, error => {
        console.error(error);
      })
  }


  removeCratesFromPallets() {
    this._apiService.removeCratesFromPallets(this.selectedCrateIdList)
      .subscribe(response => {
        console.log(this.selectedCrateIdList);
        console.log(response);

        this.linkVendorShipmentOrderId();

      }, error => {
        console.error(error);
      });
  }

  linkVendorShipmentOrderId() {
    this._apiService.linkVendorShipmentOrderId(this.vendor.id, this.shipmentOrderId)
      .subscribe(response => {
        console.log(response);

        this.createNewTransaction();
      }, error => {
        console.error(error);
      })
  }

  createNewTransaction() {
    const transactionData = serialize(
      new Transaction(
        `$ ${this.totalValue}`
      )
    );

    console.log(transactionData);

    this._apiService.createNewTransaction(transactionData)
      .subscribe(response => {
        console.log(response);
        console.log(`Transaction ID: ${response.id}`);
        this.transactionId = response['id'];

        this.linkTransactionShipmentOrderId();

      }, error => {
        console.error(error);
      })
  }

  linkTransactionShipmentOrderId() {
    this._apiService.linkTransactionShipmentOrderId(this.transactionId, this.shipmentOrderId)
      .subscribe(response => {
        console.log(response);

        this.openSnackBar(`New Shipment Order ${this.shipmentOrderRepId} has been created!`, 'Go to History');

        this.submitted = true;
      }, error => {
        console.error(error);
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    }).onAction().subscribe(() => {
      this._router.navigate(['/History']);
    });
  }

}
