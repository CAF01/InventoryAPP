export interface AddLocationRequest {
    description: string;
    addressLine: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    active: boolean;
}