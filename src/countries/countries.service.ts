import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Country } from './entities/country.entity';
import { RestCountriesProvider } from './providers/restCountries.provider';

@Injectable()
export class CountriesService {

  constructor(

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    private readonly restCountriesProvider:
      RestCountriesProvider,
  ) {}

  async findByAlpha3Code(code: string) {

    const normalizedCode = code.toUpperCase();

    // 1. Buscar localmente
    const existingCountry =
      await this.countryRepository.findOne({
        where: {
          alpha3Code: normalizedCode,
        },
      });

    // 2. Si existe, retornar caché
    if (existingCountry) {
      return existingCountry;
    }

    // 3. Si NO existe, consultar API externa
    try {

      const apiCountry =
        await this.restCountriesProvider
          .findCountryByCode(normalizedCode);

      // 4. Mapear datos
      const newCountry =
        this.countryRepository.create({

          alpha3Code:
            apiCountry.cca3,

          name:
            apiCountry.name.common,

          region:
            apiCountry.region,

          capital:
            apiCountry.capital?.[0] || '',

          population:
            apiCountry.population,

          flagUrl:
            apiCountry.flags.png,
        });

      // 5. Guardar caché local
      return await this.countryRepository.save(
        newCountry,
      );

    } catch (error) {

      throw new NotFoundException(
        `Country ${normalizedCode} not found`,
      );
    }
  }
}