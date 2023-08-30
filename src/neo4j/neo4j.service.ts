// 버전1 - onModuleInit, OnModuleDestroy를 사용했다.
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver: Driver;

  onModuleInit() {
    this.driver = neo4j.driver(
      'bolt://localhost:7687',
      neo4j.auth.basic('neo4j', '12345678') // Todo.replace with your Neo4j username and password
    );
  }

  getDriver(): Driver {
    return this.driver;
  }

  onModuleDestroy() {
    this.driver.close();
  }

  async query(query: string, parameters?: Record<string, any>) {
    const session = this.driver.session();
    try {
      const result = await session.run(query, parameters);
      return result.records;
    } finally {
      await session.close();
    }
  }
}

// @Injectable()
// export class Neo4jService {
//   private readonly driver: Driver;

//   constructor() {
//     this.driver = neo4j.driver(
//       'bolt://localhost:7687',
//       neo4j.auth.basic('neo4j', 'YOUR_PASSWORD')
//     );
//   }

//   async query(query: string, parameters?: Record<string, any>) {
//     const session = this.driver.session();
//     try {
//       const result = await session.run(query, parameters);
//       return result.records;
//     } finally {
//       await session.close();
//     }
//   }
// }
