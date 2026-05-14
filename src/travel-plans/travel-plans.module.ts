import { Module } from '@nestjs/common';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlansService } from './travel-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlan } from './entities/travel-plans.entity';

@Module({
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
  imports: [
    TypeOrmModule.forFeature([TravelPlan]),
  ],
})
export class TravelPlansModule {}
