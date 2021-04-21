import { identifierModuleUrl } from "@angular/compiler";
import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export class Crate {
    @JsonProperty('id') id: number;
    @JsonProperty('weight') weight: number;
    @JsonProperty('sku') sku: string;
    @JsonProperty('value') value: string;
    @JsonProperty('quantity') quantity: number;
    @JsonProperty('label_id') labelId: number;
    @JsonProperty('pallet_id') palletId: number;
    idDisplay: string;
    isMatched: boolean;

    getDisplayColor() {
        return 'rgb(222, 123, 42, 1)'; // Ochre Color
    }

    getTotalWeightInKg() {
        return (this.weight * this.quantity) / 1000;
    }

    getTotalValue() {
        console.log(`value of crate ${this.id} = ` + (Number(this.value.replace(/[^0-9.-]+/g, ""))));
        return `$ ${(Number(this.value.replace(/[^0-9.-]+/g, "")) * this.quantity).toFixed(2)}`;
    }

    setIdDisplay() {
        this.idDisplay = `${this.id} (${this.sku}) (${this.labelId}) [${this.palletId}]`;
    }

    toString() {
        return `Crate ID:     ${this.id}
                Label ID:     ${this.labelId === null || this.labelId === undefined ? "-" : this.labelId}
                SKU:          ${this.sku}
                Total Weight: ${this.getTotalWeightInKg()}kg
                Total Value:  ${this.getTotalValue()}
                Quantity:     ${this.quantity}
                Pallet ID:    ${this.palletId}`
    }

}