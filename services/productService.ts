import { Product } from "@/models/interfaces/product.interface";
import api from "./api";
import { CreateProductProps } from "@/models/interfaces/createProduct.interface";

export const createProduct = async (product: CreateProductProps): Promise<Product | undefined> => {
  try {
    const response = await api.post<Product>("/products", product);
    return response.data;
  } catch (error) {
    console.error("Failed to create product!", error);
  }
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (p: Product) => {
  try {
    const response = await api.put(`/products/${p.id}`, p);
    return response.data;
  } catch (error) {
    console.error("Failed to update product", error);
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
