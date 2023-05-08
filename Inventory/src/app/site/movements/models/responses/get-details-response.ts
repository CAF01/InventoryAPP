export interface GetMovementDetailsResponse {
    movementDetailID: number;
    movementID: number;
    productID: number;
    name: string;
    description: string;
    model: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    discount: number;
    imageUrl: string;
    stock: number;
    category: string;
    brand: string;
    brandUrl: string;
}