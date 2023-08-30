import { Injectable } from '@nestjs/common';
import neo4j from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Injectable()
export class HeroService {

	constructor(private readonly neo4jService: Neo4jService) {}

	async getAllFriendships(): Promise<any> {
		const query = 'MATCH (a:Hero)-[:FRIENDS_WITH]->(b:Hero) RETURN a, b';
		const result = await this.neo4jService.query(query);

		const nodes = [];
		const links = [];

		result.forEach(record => {
			nodes.push({
					id: record.get('a').identity.low,
					name: record.get('a').properties.name
			});

			nodes.push({
					id: record.get('b').identity.low,
					name: record.get('b').properties.name
			});

			links.push({
					source: record.get('a').identity.low,
					target: record.get('b').identity.low
			});
		});

		// Ensure unique nodes
		const uniqueNodes = Array.from(new Set(nodes.map(node => node.id)))
			.map(id => nodes.find(node => node.id === id));

		return {
			nodes: uniqueNodes,
			links
		};
	}

	async getHero(name: string): Promise<{ nodes: any[], links: any[] }> {
    const query = `
      MATCH (a:Hero {name: $name})
      RETURN a
    `;
    const result = await this.neo4jService.query(query, { name });

		const nodes = [];
		const links = [];

		result.forEach(record => {
      const hero = record.get('a');
      nodes.push({
        id: hero.identity.low,
        name: hero.properties.name
      });
    });

    return { nodes, links};
  }

	async getFriendsOfHero(name: string): Promise<{ nodes: any[], links: any[] }> {
    const query = `
      MATCH (a:Hero {name: $name})-[:FRIENDS_WITH]->(b:Hero)
      RETURN a,b
    `;
    const result = await this.neo4jService.query(query, { name });

		const nodes = [];
		const links = [];

		result.forEach(record => {
      const friend = record.get('b');

      nodes.push({
        id: friend.identity.low,
        name: friend.properties.name
      });
      links.push({
        source: record.get('a').identity.low,
        target: friend.identity.low
      });
    });

    return { nodes, links};
  }

  async getFriendsOfFriend(name: string): Promise<string[]> {
    const query = `
      MATCH (hero:Hero {name: $name})-[:FRIENDS_WITH]->(:Hero)-[:FRIENDS_WITH]->(friendOfFriend:Hero)
      WHERE NOT (hero)-[:FRIENDS_WITH]->(friendOfFriend)
      RETURN DISTINCT friendOfFriend.name AS friendName
    `;
    const result = await this.neo4jService.query(query, { name });
    return result.map(record => record.get('friendName'));
  }
}
