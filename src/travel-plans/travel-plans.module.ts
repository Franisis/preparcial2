import { Module } from '@nestjs/common';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlansService } from './travel-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlan } from './entities/travel-plans.entity';
import { CountriesModule } from 'src/countries/countries.module';
import { Expense } from 'src/expenses/entities/expenses.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TravelPlansService],
  controllers: [TravelPlansController],
  imports: [
    TypeOrmModule.forFeature([TravelPlan]),
    TypeOrmModule.forFeature([Expense]),
    CountriesModule,
    UsersModule,
  ],
})
export class TravelPlansModule {}
