import { Exclude } from 'class-transformer';
import { Expense } from 'src/expenses/entities/expenses.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class TravelPlan {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    startDate: Date;
  
    @Column()
    endDate: Date;
  
    @Column()
    destinationCountryCode: string;


    //@OneToMany(type => Expense, expense => expense.travelPlan)
    @Exclude()
    expenses: Expense[];
  }