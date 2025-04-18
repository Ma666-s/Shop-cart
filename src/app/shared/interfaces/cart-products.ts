import { Product } from "./product";

export interface CartProducts {
    count: number,
    _id:number,
    product: Product,
    price: number
}
