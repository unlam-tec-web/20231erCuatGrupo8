import { Product } from "./product";

export interface ShoppingCart {
  _id?: any;
  products: Product[];
  subTotal: number;
}
