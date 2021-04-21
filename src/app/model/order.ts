import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { Crate } from './crate';
import { Label } from './label';
import { Transaction } from './transaction';
import { Vendor } from './vendor';

@Serializable()
export class Order {
    @JsonProperty('') id: number;
    @JsonProperty('crates') crates: Crate[];
    @JsonProperty('origin_address') origin: string;
    @JsonProperty('target_address') destination: string;
    @JsonProperty('departure_timestamp') departureTimestamp: string;
    @JsonProperty('arrival_timestamp') arrivalTimestamp: string;
    @JsonProperty('vendor') vendor: Vendor;
    @JsonProperty('transaction') transaction: Transaction;
    @JsonProperty('label') label: Label;
    @JsonProperty('vendor_id') vendorId: string;
    @JsonProperty('delivery_method') deliveryMethod: string;
    @JsonProperty('transaction_id') transactionId: string;
    @JsonProperty('tracking') trackingId: string;
    @JsonProperty('rep_id') repId: string;
    @JsonProperty('notes') note: string;
    @JsonProperty('order_type') type: string;
    isExpanded = false;
    

    // new shipment order
    constructor(origin: string, destination: string, vendorId: string, deliveryMethod: string, departureTimestamp: string, note: string) {
        this.origin = origin;
        this.destination = destination;
        this.departureTimestamp = departureTimestamp;
        this.arrivalTimestamp = '';
        this.vendorId = vendorId;
        this.deliveryMethod = deliveryMethod;
        this.transactionId = '';
        this.trackingId = '';
        this.repId = '';
        this.note = note;
        this.type = 'shipment';
    }
    
    getArrivalDate(): Date {
        var date = new Date(this.arrivalTimestamp);
        return date;
    }

    getArrivalDateTimeString(): string {
        return `${this.getArrivalDate().toDateString()} ${this.getArrivalDate().toLocaleTimeString()}`;
    }

    getDepartureDate(): Date {
        var date = new Date(this.departureTimestamp);
        return date;
    }

    getDepartureDateTimeString(): string {
        return `${this.getDepartureDate().toDateString()} ${this.getDepartureDate().toLocaleTimeString()}`;
    }

    isCrateAssignedBefore(): boolean {
        var totalAssigned = 0;
        this.crates?.forEach(crate => {
            totalAssigned += (crate?.palletId != null)?  1 : 0;
        });

        console.log(`id = ${this.id}, repId = ${this.repId}, type = ${this.type}, crates.length = ${this.crates.length}, totalAssigned = ${totalAssigned}`);

        return (totalAssigned > 0) ? true : false;
    }

    isAllCratesAssigned(): boolean {
        var totalAssigned = 0;
        this.crates?.forEach(crate => {
            totalAssigned += (crate?.palletId != null)?  1 : 0;
        });

        console.log(`id = ${this.id}, repId = ${this.repId}, type = ${this.type}, crates.length = ${this.crates.length}, totalAssigned = ${totalAssigned}`);
       
        return (totalAssigned == this.crates.length) ? true : false;
    }

}