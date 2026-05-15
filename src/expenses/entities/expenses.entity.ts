import { Exclude } from "class-transformer";
import { TravelPlan } from "src/travel-plans/entities/travel-plans.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense 
{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    description:string;
    @Column()
    amount:string;
    @Column()
    category:string;

    @ManyToOne(()=>TravelPlan, travelPlan=>travelPlan.expenses)
    @Exclude()
    travelPlan:TravelPlan;
}