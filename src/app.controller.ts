import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j/neo4j.service';
import { UserService } from './user/sample';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    //private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all')
  async getAll() {
    console.log('모든 정보를 불러옵니다 🚀');
    // const res = await this.userService.getAllUsers();

    // console.log('res:', res);
    // console.log('res[0].keys', res[0]?.keys);
    // //console.log('res[0]._fields', res[0]?._fields);

    return 'hello';
  }

  @Get('/accord')
  async getAccordOfPerfume() {
    console.log('모든 정보를 불러옵니다 🚀');
    //const res = await this.userService.getAccordOfPerfume('리켄데코스');

    //console.log('res.records:', res.records);
    //console.log('res[0].keys', res[0]?.keys);
    //console.log('res[0]._fields', res[0]?._fields);

    return 'hello';
  }
}
