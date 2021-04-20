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

    getDisplayColor() {
        return 'rgb(222, 123, 42, 1)'; // Ochre Color
    }

    getTotalWeightInKg() {
        return (this.weight * this.quantity) / 1000;
    }
    
    toString() {
        return `Crate ID:     ${this.id}
                Label ID:     ${this.labelId === null || this.labelId === undefined ? "-" : this.labelId}
                SKU:          ${this.sku}
                Total Weight: ${this.getTotalWeightInKg()}kg
                Value:        ${this.value}
                Quantity:     ${this.quantity}
                Pallet ID:    ${this.palletId}`
    }

}