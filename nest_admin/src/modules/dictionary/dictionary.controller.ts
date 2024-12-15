import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) { }

  @Get()
  findAll() {
    return this.dictionaryService.findAll();
  }

  @Get("options")
  findDictionaryOptions(@Query("dictionaryId") dictionaryId) {
    return this.dictionaryService.findDictionaryOptions(dictionaryId)
  }


  @Post("saveOptions")
  createOptions(@Body() options) {
    this.dictionaryService.createOptions(options)
  }

  @Post("save")
  create(@Body() dictionary) {
    this.dictionaryService.create(dictionary)
  }

  @Post("update")
  update(@Body() dictionary) {
    this.dictionaryService.update(dictionary)
  }

}
