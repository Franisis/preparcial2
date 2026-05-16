import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
  } from 'class-validator';
  
  export class CreateTravelPlanDto {
  
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsDateString()
    startDate: Date;
  
    @IsDateString()
    endDate: Date;
  
    @IsString()
    @Length(3, 3)
    destinationCountryCode: string;

    @IsNumber()
    userId:number;
  }