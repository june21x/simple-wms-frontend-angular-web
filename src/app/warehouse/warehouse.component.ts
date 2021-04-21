import { Component, OnInit } from '@angular/core';
import { deserialize } from 'typescript-json-serializer';
import { Pallet } from '../model/pallet';
import { Crate } from '../model/crate';
import { SimpleWMSService } from '../service/simple-wms.service';

@Component({
  selector: 'warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})

export class WarehouseComponent implements OnInit {
  palletList = new Array<Pallet>();
  maxCratesPerPallet = 4;
  showCrates = false;

  constructor(private _apiService: SimpleWMSService) {}

  ngOnInit() {
    this._apiService.getPalletList()
    .subscribe(
      response => {
        let deserializedPalletList = new Array<Pallet>(); // Create an empty Pallet list
        
        let dataList = response;
        dataList.forEach(function (pallet: Pallet) {
          let deserializedPallet = deserialize<Pallet>(pallet, Pallet) // deserialize pallet
          
          let deserializedCrateList = new Array<Crate>(); // Create an empty Crate list for each Pallet

          deserializedPallet.crates.forEach(function (crate: Crate) {
            deserializedCrateList.push(deserialize<Crate>(crate, Crate)); // deserialize each Crate and push it into Crate list
          })
          deserializedPallet.crates = deserializedCrateList; // saves deserialized Crate list into deserialized Pallet
          deserializedPalletList.push(deserializedPallet); // push deserialized pallet into Pallet list

        })
        this.palletList = deserializedPalletList; //saves deserialized Pallet list into binding property
      },
      error => {
        console.log(error);
      }
    )
  }

  getTotalCrates() {
    let totalCrates = 0;

    this.palletList.forEach(pallet => {
      totalCrates += pallet.getTotalCrates();
    });

    return totalCrates;
  }

  getTotalPallets() {
    return this.palletList.length;
  }

  getTotalCrateSlots() {
    return this.getTotalPallets() * this.maxCratesPerPallet;
  }

  getCapacityFraction() {
    return `${this.getTotalCrates()}/${this.getTotalCrateSlots()}`;
  }

  getCapacityPercentage() {
    return ((this.getTotalCrates() / this.getTotalCrateSlots()) * 100).toFixed(2);
  }

  getTotalPalletsUtilized() {
    let totalPalletsUtilized = 0;
    this.palletList.forEach(pallet => {
      if(pallet.getTotalCrates() > 0) {
        totalPalletsUtilized ++;
      } 
    });

    return totalPalletsUtilized;
  }

  getTotalPalletsUnutilized() {
    let totalPalletsUnutilized = 0;

    this.palletList.forEach(pallet => {
      if(pallet.getTotalCrates() == 0) {
        totalPalletsUnutilized ++;
      } 
    });

    return totalPalletsUnutilized;
  }

  getTotalValue() {
    let totalValue = 0;
    this.palletList.forEach(
      pallet => {
        totalValue += parseFloat(pallet.getTotalValue().substring(2));
      }
    )

    return `$ ${totalValue.toFixed(2)}`;
  }

  getCapacityColor() {

  }

  capacityToString() {
    return `Total Pallets:            ${this.getTotalPallets()}
            Total Pallets Utilized:   ${this.getTotalPalletsUtilized()}
            Total Pallets Unutilized: ${this.getTotalPalletsUnutilized()}
            Total Crates:             ${this.getCapacityFraction()}
            Total Value:              ${this.getTotalValue()}`;
  }

}