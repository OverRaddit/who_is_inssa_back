import { Module } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
  providers: [Neo4jService],
  exports: [Neo4jService], // export the service so it's accessible in other modules
})
export class Neo4jModule {}
