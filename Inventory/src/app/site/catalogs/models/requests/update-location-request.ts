export interface UpdateLocationRequest {
    locationID: number;
    description: string;
    addressLine: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}