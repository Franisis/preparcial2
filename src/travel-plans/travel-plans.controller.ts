import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
  } from '@nestjs/common';
  
  import { TravelPlansService }
    from './travel-plans.service';
  
  import { CreateTravelPlanDto }
    from './dto/create-travel-plan.dto';
import { createTravelExpensesDto } from './dto/create-travel-expenses.dto';
  
  @Controller('travel-plans')
  export class TravelPlansController {
  
    constructor(
      private readonly travelPlansService:
        TravelPlansService,
    ) {}
  
    @Post()
    create(
      @Body() dto: CreateTravelPlanDto,
    ) {
      return this.travelPlansService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.travelPlansService.findAll();
    }
  
    @Get(':id')
    findOne(
      @Param('id', ParseIntPipe)
      id: number,
    ) {
      return this.travelPlansService.findOne(id);
    }

    /**
     * 
     * @param id 
     * @param dto: este es el dto de travel expenses (pendiente de crear)
     * @returns 
     */
    @Post(':id')
    addExpenses(
      @Param('id', ParseIntPipe)
      id:number,
      @Body() dto: createTravelExpensesDto,

    ){
      return this.travelPlansService.addExpenses(id,dto)
    }
  
    @Delete(':id')
    remove(
      @Param('id', ParseIntPipe)
      id: number,
    ) {
      return this.travelPlansService.remove(id);
    }
  }