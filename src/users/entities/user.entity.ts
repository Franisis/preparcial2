import { TravelPlan } from "src/travel-plans/entities/travel-plans.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User 
{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;

    @OneToMany(type=> TravelPlan, travelPlan=>travelPlan.user)
    travelPlans:TravelPlan[];
}