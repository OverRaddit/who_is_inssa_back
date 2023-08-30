import { Controller, Get, Param } from '@nestjs/common';
import { HeroService } from './hero.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';

// @ApiTags('heroes') // <- Todo.무슨동작일지, 어떤 라이브러리인지 알아볼것
@Controller('api/heroes')
export class HeroController {
    constructor(
      private readonly heroService: HeroService,
      private readonly neo4jService: Neo4jService,
    ) {}

    // 전체 히어로들의 친구관계 조회
    @Get('friendships')
    async getAllFriendships() {
      console.log('전체 히어로 요청 🚀');

      const ret = await this.heroService.getAllFriendships();
      console.log('ret:',ret);
      return ret;
    }

    // 전체 히어로들의 친구관계 조회
    @Get(':heroName')
    async getHero(@Param('heroName') heroName: string) {
      console.log(`단일 히어로(${heroName}) 노드 요청 🚀`);

      const ret = await this.heroService.getHero(heroName);
      console.log('ret:',ret);
      return ret;
    }

    // 특정 히어로의 친구관계 조회
    @Get(':heroName/friends')
    async getHeroFriends(@Param('heroName') heroName: string) {
      console.log(`단일 히어로(${heroName}) 친구 요청 🚀`);
      // const query = `
      //   MATCH (hero:Hero {name: $heroName})-[:FRIENDS_WITH]->(friend:Hero)
      //   RETURN friend.name AS friendName
      // `;
      // const result = await this.neo4jService.query(query, { heroName });
      //return result.map(record => record.get('friendName'));
      const ret = await this.heroService.getFriendsOfHero(heroName);
      console.log('ret:',ret);
      return ret;
    }
}
