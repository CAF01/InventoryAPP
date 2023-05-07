export interface AddProductRequest {
    name: string;
    description: string;
    model: string;
    price: number;
    imageUrl: string;
    stock: number;
    brandID: number;
    categoryID: number;
    active: boolean;
}