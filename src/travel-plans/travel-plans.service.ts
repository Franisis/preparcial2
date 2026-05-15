import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

//import { TravelPlan } from './entities/travel-plan.entity';

import { CreateTravelPlanDto }
  from './dto/create-travel-plan.dto';

import { CountriesService }
  from '../countries/countries.service';
import { TravelPlan } from './entities/travel-plans.entity';
import { createTravelExpensesDto } from './dto/create-travel-expenses.dto';
import { Expense } from 'src/expenses/entities/expenses.entity';

@Injectable()
export class TravelPlansService {
  

  constructor(

    @InjectRepository(TravelPlan)
    private readonly travelPlanRepository:
      Repository<TravelPlan>,

    @InjectRepository(Expense)  
    private readonly expenseRepository: Repository<Expense>,  

    private readonly countriesService:
      CountriesService,


  ) {}





  async create(dto: CreateTravelPlanDto) {

    // Validar/cargar país
    await this.countriesService
      .findByAlpha3Code(
        dto.destinationCountryCode,
      );

    // Crear plan
    const plan =
      this.travelPlanRepository.create(dto);

    return await this.travelPlanRepository.save(
      plan,
    );
  }

  async addExpenses(id: number, dto: createTravelExpensesDto) {
    const plan = await this.travelPlanRepository.findOne({
      where:{id}
    })
    if (plan){
      const newExpense = new Expense();
        newExpense.amount = dto.amount;
        newExpense.category = dto.category;
        newExpense.description = dto.description;
        newExpense.travelPlan = plan;
    
        
        console.log(plan);
      //añadimos expenses al plan
      const expensedata = await this.expenseRepository.save(newExpense);
      console.log(expensedata);
      if (plan?.expenses)
        {
          plan.expenses.push(expensedata);
        }
        else {
          plan.expenses = [expensedata];
        }
      const travelPlan =  await this.travelPlanRepository.save(plan);
      return {
        id: travelPlan.id,
        expenses: travelPlan.expenses.map(e => ({
        id: e.id,
        amount: e.amount
  }))
      }
    }
    else {
      throw new Error(`Travel plan not found`);
    }
  }

  async findAll() {
    return this.travelPlanRepository.find();
  }

  async findOne(id: number) {
    return this.travelPlanRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {

    return this.travelPlanRepository.delete(id);
  }
}