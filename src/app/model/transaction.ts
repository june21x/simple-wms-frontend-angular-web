import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export class Transaction {
    @JsonProperty('id') id: number;
    @JsonProperty('rep_id') repId: string;
    @JsonProperty('value') value: string;

    constructor(value: string) {
        this.repId = "";
        this.value = value;
    }
}