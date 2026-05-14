import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  
  @Controller('travel-plans')
  export class TravelPlansController {
  
    @Post()
    create(@Body() dto: any) {
      return dto;
    }
  
    @Get()
    findAll() {
      return [];
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return id;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return id;
    }
  }