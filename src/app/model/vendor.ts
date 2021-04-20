import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export class Vendor {
    @JsonProperty('id') id: number;
    @JsonProperty('name') name: string;
    @JsonProperty('address') address: string;
    @JsonProperty('rep_id') repId: number;
}

