import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Country } from './entities/country.entity';
import { CountriesService } from './countries.service';
import { RestCountriesProvider } from './providers/restCountries.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    HttpModule,
  ],
  providers:
  [
    CountriesService,
    RestCountriesProvider,
  ],
  exports: [CountriesService],
})
export class CountriesModule {}