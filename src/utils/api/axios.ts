import {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/interface/product";
import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export const fetchProducts = async ({
  offset,
  limit,
  title,
}: {
  offset: number;
  limit: number;
  title: string;
}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`, {
      params: {
        offset,
        limit,
        title,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllProducts = async () => {
  return axios.get(`${API_BASE_URL}/products`);
};

export const fetchProductById = async (id: number) => {
  return axios.get(`${API_BASE_URL}/products/${id}`);
};

export const createProduct = async (product: CreateProductRequest) => {
  return axios.post(`${API_BASE_URL}/products`, product);
};

export const updateProduct = async (
  id: number,
  product: Omit<UpdateProductRequest, "id">,
) => {
  return axios.put(`${API_BASE_URL}/products/${id}`, product);
};

export const deleteProduct = async (id: number) => {
  return axios.delete(`${API_BASE_URL}/products/${id}`);
};

export const fetchCategories = async () => {
  return axios.get(`${API_BASE_URL}/categories`);
};
