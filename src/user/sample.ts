import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  // async getAllUsers() {
  //   const session = this.neo4jService.getDriver().session();
  //   try {
  //     const result = await session.run('MATCH (n) \
  //     OPTIONAL MATCH (n)-[r]-() \
  //     RETURN n, r;');
  //     return result.records;
  //   } finally {
  //     await session.close();
  //   }
  // }

  // async getAccordOfPerfume(username: string) {
  //   const session = this.neo4jService.getDriver().session();
  //   try {
  //     const query = `
  //       MATCH (p:Perfume {name: $username})-[:HAS_ACCORD]->(a:Accord)
  //       RETURN a;
  //     `;
  //     // 문자열 쿼리에 있는 변수값을 대입할 수 있다.
  //     const result = await session.run(query, { username });
  //     console.log('result:', result);
  //     console.log('result.records:', result.records);
  //     result.records.map((accord) => console.log(accord.get('a')));
  //     /*
  //       쿼리문 실행시 반환되는 객체의 내용

  //       records : Record[],
  //       summary: ResultSmmary
  //     */

  //     //return result.records.map(record => record.get('friend').properties);
  //     return 'x';
  //   } finally {
  //     await session.close();
  //   }
  // }
}
