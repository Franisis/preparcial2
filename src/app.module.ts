import { MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod, } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';

import { AuditMiddleware } from './common/middleware/audit.middleware';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DB_HOST'),

        port: configService.get<number>('DB_PORT'),

        username: configService.get<string>('DB_USERNAME'),

        password: configService.get<string>('DB_PASSWORD'),

        database: configService.get<string>('DB_NAME'),

        autoLoadEntities: true,

        synchronize: true,
       
      }),
      
    }),

    CountriesModule,

    TravelPlansModule,

    ExpensesModule,

    UsersModule,
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes(
        'travel-plans',
        'users',
      );
  }
  
}