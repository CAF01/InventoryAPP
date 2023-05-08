export interface UpdateProductRequest {
    productID: number;
    name: string;
    description: string;
    model: string;
    price: number;
    imageUrl: string;
    stock: number;
    brandID: number;
    categoryID: number;
}