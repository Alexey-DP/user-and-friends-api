import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import FollowingSeeder from './following.seed';
import UserSeeder from './users.seed';

export default class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        await runSeeder(dataSource, UserSeeder);
        await runSeeder(dataSource, FollowingSeeder);
    }
}