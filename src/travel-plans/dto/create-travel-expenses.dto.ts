import { IsString } from "class-validator";

export class createTravelExpensesDto 
{
    @IsString()
    description:string;
    @IsString()
    amount:string;
    @IsString()
    category:string;
    
    travelPlanId:number;
}