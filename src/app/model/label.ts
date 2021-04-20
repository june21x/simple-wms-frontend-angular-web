import { isLabeledStatement } from "typescript";
import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export class Label {
    @JsonProperty('id') id: number;
    @JsonProperty('order_id') orderId: number;
}