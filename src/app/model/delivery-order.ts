import { JsonProperty, Serializable, deserialize, serialize } from 'typescript-json-serializer';

@Serializable()
export class DeliveryOrder {
    @JsonProperty('') id: number;
    @JsonProperty('delivery_method') deliveryMethod: string;
    @JsonProperty('origin_address') origin: string;
    @JsonProperty('target_address') destination: string;
    @JsonProperty('arrival_timestamp') arrivalTimestamp: string;
    @JsonProperty('vendor_id') vendorId: number;
    @JsonProperty('transaction_id') transactionId: number;
    @JsonProperty('tracking') trackingId: string;
    @JsonProperty('notes') note: string;

    getArrivalDate(): string {
        var date = new Date(this.arrivalTimestamp).toTimeString();
        return date;
    }
}