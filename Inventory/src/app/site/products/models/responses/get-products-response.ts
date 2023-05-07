import { Brand } from "../POCOs/brand";
import { Category } from "../POCOs/category";

export interface GetProductsResponse {
    productID: number;
    name: string;
    description: string;
    model: string;
    price: number;
    imageUrl: string;
    brand: Brand;
    category: Category;
    stock: number;
    active: boolean;
    quantity: number;
}