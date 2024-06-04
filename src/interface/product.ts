export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
}

export interface UpdateProductRequest {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
