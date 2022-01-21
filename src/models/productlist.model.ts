import { Product } from "./product.model";

export interface ProductList {
  Items?: Array<Product>;
  TotalResults?: number;
}
