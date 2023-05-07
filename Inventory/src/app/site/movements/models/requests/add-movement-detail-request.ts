export interface AddMovementDetailRequest {
    movementID: number;
    productID: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    discount: number;
}