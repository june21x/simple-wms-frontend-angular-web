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
        console.log(this.palletList);
      },
      error => {
        console.log(error);
      }
    )
  }

  getCapacity(): number {
    var totalCrates = 0;

    this.palletList.forEach(pallet => {
      totalCrates += pallet.getTotalCrates();
    });

    const totalPallet = 81;
    const maxCratesPerPallet = 4;
    var capacity = (totalCrates / (totalPallet * maxCratesPerPallet) ) * 100;
    return capacity;
  }

  getCapacityColor(): string {
    var color;
    var capacity = this.getCapacity();
    var r: number;
    var g;
    var b;
    // 0 204 0
    // 102 204 0
    // 204 204 0
    // 204 102 0
    // 204 0 0
    if(capacity > 0 && capacity < 50) {
      
    }

    return color;
  }

  onPalletClick(pallet: Pallet) {
    console.log(`Pallet Location: (${pallet.x}, ${pallet.y})`);
  }

  onCrateClick(crate: Crate) {
    console.log(`Crate ID: ${crate.id}\nCrate SKU: ${crate.sku}`);
  }

}