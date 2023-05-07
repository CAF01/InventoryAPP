import { GetMovementDetailsResponse } from "./get-details-response";

export interface GetMovementsResponse {
    movementID: number;
    kindOfMovement: boolean;
    createdAt: string;
    scheduledBy: string | null;
    fromLocationID: number | null;
    fromCountry: string | null;
    fromdescription: string | null;
    fromAddressLine: string | null;
    fromCity: string | null;
    fromState: string | null;
    fromZipCode: string | null;
    toLocationID: number | null;
    toCountry: string | null;
    todescription: string | null;
    toAddressLine: string | null;
    toCity: string | null;
    toState: string | null;
    toZipCode: string | null;
    firstName: string;
    lastName: string;
    movementDetails: GetMovementDetailsResponse[] | null;
}