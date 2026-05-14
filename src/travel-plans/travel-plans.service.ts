import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

//import { TravelPlan } from './entities/travel-plan.entity';

import { CreateTravelPlanDto }
  from './dto/create-travel-plan.dto';

import { CountriesService }
  from '../countries/countries.service';
import { TravelPlan } from './entities/travel-plans.entity';

@Injectable()
export class TravelPlansService {

  constructor(

    @InjectRepository(TravelPlan)
    private readonly travelPlanRepository:
      Repository<TravelPlan>,

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