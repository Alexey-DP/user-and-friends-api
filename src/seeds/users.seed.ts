import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User.entity';
import { CONSTANTS } from '../enum/constants.enum';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userFactory = await factoryManager.get(User);
        await userFactory.saveMany(CONSTANTS.USERS_COUNT_FOR_SEED);
    }
}