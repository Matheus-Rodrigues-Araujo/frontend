"use client";
import { FormEvent, useState } from "react";
import { createProduct } from "@/services/productService";
import { CreateProductProps } from "@/models/interfaces/createProduct.interface";
import { useRouter } from "next/navigation";

const CreateProductPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCreateProduct({ title, image });
    router.push("/admin/products")
  };

  const handleCreateProduct = async ({ title, image }: CreateProductProps) => {
    try {
      await createProduct({ title, image });
      alert("Product created!");
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div className="w-3/12">
      <div className="">
        <h2 className="text-xl font-semibold mb-4 ">Atualizar Produto</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título do Produto
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              URL da Imagem
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Digite a URL da imagem"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
