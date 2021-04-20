import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export class Transaction {
    @JsonProperty('id') id: number;
    @JsonProperty('rep_id') repId: number;
    @JsonProperty('value') value: string;
}