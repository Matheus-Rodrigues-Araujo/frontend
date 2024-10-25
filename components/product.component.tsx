"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/models/interfaces/product.interface";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "@/services/productService";
import UpdateProductModel from "./update-product.component";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      alert("Product deleted!");
    } catch (error) {
      console.error("Could not delete the product", error);
    }
  };

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
      setShowModal(false);
      alert("Product updated!");
    } catch (error) {
      console.error("Could not update the product", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 px-1" >
        <h2 className="text-xl font-semibold">Admin</h2>
        <Link href="/admin/products/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" >Create Product</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Image</th>
              <th className="p-3">Likes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.length > 0 &&
              products?.map((p: Product, key) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">
                    <Image
                      src={p.image.startsWith("http") ? p.image : p.image}
                      alt={`${p.title} image`}
                      width={120}
                      height={120}
                      objectFit="cover"
                    />
                  </td>
                  <td className="p-3">{p.likes}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => handleUpdateClick(p)}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedProduct && (
        <UpdateProductModel
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Products;
