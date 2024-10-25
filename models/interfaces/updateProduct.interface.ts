import { Product } from "./product.interface";

export interface UpdateProductModelProps {
  product: Product;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
}
