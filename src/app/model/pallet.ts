import { JsonProperty, Serializable } from "typescript-json-serializer";
import { Crate } from "./crate";

const maxCrates = 4;

@Serializable()
export class Pallet {
    @JsonProperty('id') id: number;
    @JsonProperty('loc_x') x: number;
    @JsonProperty('loc_y') y: number;
    @JsonProperty('weight') totalWeight: number;
    @JsonProperty('crates') crates: Array<Crate>;

    getTotalCrates() {
        return this.crates.length;
    }

    getCapacity() {
        return this.getTotalCrates() / maxCrates;
    }

    getTotalWeightInKg() {
        return this.totalWeight / 1000;
    }

    getDisplayColor() {
        const purple = 'rgb(66, 11, 150, ';
        let alpha: number;
        let capacity = this.getCapacity();

        switch (capacity) {
            case 0:
                alpha = PalletAlpha.Pallet0;
                break;
            case 0.25:
                alpha = PalletAlpha.Pallet1;
                break;
            case 0.5:
                alpha = PalletAlpha.Pallet2;
                break;
            case 0.75:
                alpha = PalletAlpha.Pallet3;
                break;
            case 1:
                alpha = PalletAlpha.Pallet4;
                break;
            default:
                console.log('Something wrong with pallet capacity');
        }
        
        return purple + alpha + ')';
    }

    toString() {
        return `Pallet ID:    ${this.id}
                Location:     [${this.x}, ${this.y}]
                Total Weight: ${this.getTotalWeightInKg()}kg
                Capacity:     ${this.getTotalCrates()}/${maxCrates}`;
    }

}

enum PalletAlpha {
    Pallet0 = 0.05,
    Pallet1 = 0.25,
    Pallet2 = 0.5,
    Pallet3 = 0.75,
    Pallet4 = 1,
}
