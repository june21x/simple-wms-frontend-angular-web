import { Crate } from "./crate";

export class Pallet {
    id: number;
    loc_x: number;
    loc_y: number;
    crates: Array<Crate>;
}