import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})

export class WarehouseComponent implements OnInit {
  numbers = [];
  pallets = [PalletAlpha.Pallet1, PalletAlpha.Pallet1, PalletAlpha.Pallet1, PalletAlpha.Pallet1, PalletAlpha.Pallet4, PalletAlpha.Pallet1, PalletAlpha.Pallet1, PalletAlpha.Pallet2, PalletAlpha.Pallet4, PalletAlpha.Pallet4, PalletAlpha.Pallet4, PalletAlpha.Pallet4, PalletAlpha.Pallet3, PalletAlpha.Pallet3, PalletAlpha.Pallet3, PalletAlpha.Pallet3, PalletAlpha.Pallet4, PalletAlpha.Pallet1, PalletAlpha.Pallet2, PalletAlpha.Pallet2, PalletAlpha.Pallet1, PalletAlpha.Pallet1, PalletAlpha.Pallet1,];
  capacityPercentage = this.getCapacity();

  constructor() {
    
  }

  ngOnInit() {

  }

  getCapacity(): number {
    var totalCrates = 56;
    var totalPallet = 81;
    var capacity = 56/81 * 100;
    return capacity;
  }

}

enum PalletAlpha {
  Pallet0 = 1,
  Pallet1 = .8,
  Pallet2 = .5,
  Pallet3 = .25,
  Pallet4 = .05,
}