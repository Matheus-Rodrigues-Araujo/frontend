"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Product } from "@/models/interfaces/product.interface";

const MainPage = () => {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL}/api/products`);
      setProducts(response.data);
    })();
  }, []);

  const handleLike = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL}/api/products/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      setProducts(
        products.map((p: Product) => {
          if (p.id === id) {
            p.likes += 1;
          }
          return p;
        })
      );
    } catch (error) {
      console.error("Error liking the product:", error);
    }
  };

  return (
    <main className="container m-4 px-4 min-h-screen flex flex-col ">
      <h1 className="font-bold text-2xl my-4" >Main App</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((p: Product, key) => (
          <div
            key={key}
            className="bg-white w-[200px] shadow-md rounded-lg overflow-hidden max-w-xs mx-auto"
          >
            <div className="p-3">
              <div className="aspect-w-1 aspect-h-1 h-[120px]">
                <Image
                  src={p.image}
                  alt={`${p.title} image`}
                  width={150}
                  height={150}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="">
                <h3 className="text-md font-semibold">{p.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="space-x-1">
                    <button
                      type="button"
                      className="px-2 py-1 text-sm font-semibold text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition"
                      onClick={() => handleLike(p.id)}
                    >
                      Like
                    </button>
                  </div>
                  <small className="text-gray-500">Likes: {p.likes}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainPage;
