type Company = {
    id: number;
    code: string;
    name: string;
    address: string;
  }
  
  type Brand = {
    id: number;
    company: Company;
    code: string;
    name: string;
  }
  
  type Category = {
    id: number;
    name: string;
  }
  
  type ProductCategory = {
    id: number;
    company: Company;
    name: string;
    category: Category;
  }
  
 export type Product = {
    id: number;
    code: string;
    name: string;
    price: number;
    minimum_stock: number;
    company: Company;
    brand: Brand;
    product_category: ProductCategory;
  }

export type ProductForm = {
    id?: number
    code?: string;
    name: string;
    price: number;
    minimum_stock: string;
    brand: string;
    product_category: string;
}