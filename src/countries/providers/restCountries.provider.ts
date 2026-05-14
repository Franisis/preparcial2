import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class RestCountriesProvider {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async findCountryByCode(code: string) {

    const response = await firstValueFrom(
      this.httpService.get(
        `https://restcountries.com/v3.1/alpha/${code}`,
      ),
    );

    return response.data[0];
  }
}