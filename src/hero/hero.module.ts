import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
    imports: [],
    providers: [HeroService, Neo4jService],
    controllers: [HeroController]
})
export class HeroModule {}
