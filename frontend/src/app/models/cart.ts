import { Product } from "./product";

export interface ShoppingCart {
  email: string | null;
  products: Product[];
  subTotal: number;
}
