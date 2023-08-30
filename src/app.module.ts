import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j/neo4j.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UserService } from './user/sample';
import { HeroController } from './hero/hero.controller';
import { HeroService } from './hero/hero.service';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [HeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
