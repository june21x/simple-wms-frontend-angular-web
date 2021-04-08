export class DeliveryOrder {
    id: number;
    delivery_method: string;
    origin_address: string;
    destination: string;
    arrival_timestamp: string;
    vendor_id: number;
    transaction_id: number;
    tracking: string;
    notes: string;
}