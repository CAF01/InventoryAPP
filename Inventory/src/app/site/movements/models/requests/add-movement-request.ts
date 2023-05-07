import { TypeOfMovement } from "src/app/site/core/type-of-movement";
import { AddMovementDetailRequest } from "./add-movement-detail-request";

export interface AddMovementRequest {
    typeOfMovement: TypeOfMovement;
    createdAt: string;
    scheduledBy: string;
    fromLocationID: number | null;
    toLocationID: number | null;
    userID: number;
    movementProducts: AddMovementDetailRequest[];
}